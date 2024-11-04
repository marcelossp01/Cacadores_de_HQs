import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Publicacoes = () => {
  const [userProducts, setUserProducts] = useState([]);

  // Carrega os produtos do AsyncStorage ao montar o componente
  useEffect(() => {
    loadProducts();
  }, []);

  // Função para carregar os produtos do AsyncStorage
  const loadProducts = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_products');
      if (jsonValue != null) {
        setUserProducts(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Renderiza cada produto
  const renderUserProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productValue}>R$ {item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Publicações</Text>
      <FlatList
        data={userProducts}
        renderItem={renderUserProduct}
        keyExtractor={(item, index) => index.toString()}
        style={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productList: {
    marginTop: 20,
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
});

export default Publicacoes;
