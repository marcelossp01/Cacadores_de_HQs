import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native'; 

export default function Usuarios() {
  const navigation = useNavigation(); // Hook de navegação
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productValue, setProductValue] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [userProducts, setUserProducts] = useState([]); // Estado para armazenar as publicações do usuário

  // Função para solicitar permissões
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Acesso à galeria negado!', 'Você precisa permitir o acesso à galeria para selecionar uma imagem.');
    }
  };

  // Chamar a função de permissão e carregar produtos do AsyncStorage ao montar o componente
  useEffect(() => {
    requestPermission();
    loadProducts(); // Carrega produtos do AsyncStorage ao montar
  }, []);

  // Carregar produtos do AsyncStorage
  const loadProducts = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_products');
      if (jsonValue != null) {
        setUserProducts(JSON.parse(jsonValue));
      }
    } catch (e) {
      // erro ao carregar os dados
      console.error(e);
    }
  };

  // Função para salvar produtos no AsyncStorage
  const saveProducts = async (products) => {
    try {
      const jsonValue = JSON.stringify(products);
      await AsyncStorage.setItem('@user_products', jsonValue);
    } catch (e) {
      // erro ao salvar os dados
      console.error(e);
    }
  };

  // Função para selecionar uma imagem
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
    }
  };

  // Envia o produto e armazena localmente no estado userProducts
  const handleSubmit = () => {
    if (productName && productDescription && productValue && productImage) {
      const newProduct = {
        name: productName,
        description: productDescription,
        value: productValue,
        image: productImage,
      };

      // Adiciona o novo produto à lista local
      setUserProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, newProduct];

        // Salva os produtos atualizados no AsyncStorage
        saveProducts(updatedProducts);

        // Limpa os campos após o envio
        setProductName('');
        setProductDescription('');
        setProductValue('');
        setProductImage(null);

        // Navega para a tela de publicações passando as informações do novo produto
        navigation.navigate('Publicacoes', { product: newProduct });

        return updatedProducts;
      });
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  // Função para excluir um produto
  const handleDeleteProduct = (index) => {
    Alert.alert(
      'Excluir Produto',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            setUserProducts((prevProducts) => {
              const updatedProducts = [...prevProducts];
              updatedProducts.splice(index, 1); // Remove o produto pelo índice

              // Salva os produtos atualizados no AsyncStorage
              saveProducts(updatedProducts);

              return updatedProducts;
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Renderiza os produtos do usuário com o botão de excluir
  const renderUserProduct = ({ item, index }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productValue}>R$ {item.value}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(index)}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Publicar seu Produto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={productName}
        onChangeText={setProductName}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição do Produto"
        value={productDescription}
        onChangeText={setProductDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Valor do Produto (R$)"
        value={productValue}
        onChangeText={setProductValue}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {productImage && (
        <Image
          source={{ uri: productImage }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>

      {/* Lista de produtos publicados pelo usuário */}
      <Text style={styles.userProductsTitle}>Suas Publicações:</Text>
      <FlatList
        data={userProducts}
        renderItem={renderUserProduct}
        keyExtractor={(item, index) => index.toString()}
        style={styles.productList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#38a69d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: '#38a69d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 10,
  },
  productList: {
    width: '100%',
    marginTop: 20,
  },
  userProductsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
  },
  productValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3FAB',
  },
  deleteButton: {
    backgroundColor: '#38a69d',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
