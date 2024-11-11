import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Sacola() {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedProduct } = route.params || {}; // Recebendo o produto selecionado

  const [items, setItems] = useState([]);

  // Adiciona o produto à sacola, verificando se já existe
  useEffect(() => {
    if (selectedProduct) {
      setItems((prevItems) => {
        const itemExists = prevItems.some(item => item.id === selectedProduct.id);
        if (!itemExists) {
          // Garantir que item.value seja um número
          const product = { ...selectedProduct, quantity: 1, value: Number(selectedProduct.value) };
          return [...prevItems, product];
        }
        return prevItems;
      });
    }
  }, [selectedProduct]);

{items.length > 0 ? (
  items.map((item, index) => (
    <View key={item.id || index} style={styles.itemContainer}> {/* Usando item.id ou index como fallback */}
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productValue}>
          R$ {item.value && !isNaN(item.value) ? item.value.toFixed(2) : '0.00'}
        </Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput 
          style={styles.quantityInput} 
          value={String(item.quantity)} 
          editable={false} 
        />
        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  ))
) : (
  <>
    <View style={styles.iconContainer}>
      <Image 
        source={require('../../../assets/Diversos/Sacola.png')}
        style={styles.icon}
      />
    </View>
    <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
    <Text style={styles.descriptionText}>
      Navegue pelo aplicativo ou faça uma busca para encontrar seus produtos
    </Text>
  </>
)}

{items.length > 0 ? (
  items.map((item, index) => (
    <View key={item.id || index} style={styles.itemContainer}> {/* Usando item.id ou index como fallback */}
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productValue}>
          R$ {item.value && !isNaN(item.value) ? item.value.toFixed(2) : '0.00'}
        </Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput 
          style={styles.quantityInput} 
          value={String(item.quantity)} 
          editable={false} 
        />
        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  ))
) : (
  <>
    <View style={styles.iconContainer}>
      <Image 
        source={require('../../../assets/Diversos/Sacola.png')}
        style={styles.icon}
      />
    </View>
    <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
    <Text style={styles.descriptionText}>
      Navegue pelo aplicativo ou faça uma busca para encontrar seus produtos
    </Text>
  </>
)}

  const increaseQuantity = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setItems(items.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (Number(item.value) || 0) * item.quantity, 0).toFixed(2);
  };

  const handleCloseOrder = () => {
    if (items.length) {
      navigation.navigate('ConfirmacaoPedido', { total: getTotalPrice() });
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sacola ({items.length})</Text>

      {items.length > 0 ? (
        items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productValue}>
                R$ {item.value && !isNaN(item.value) ? item.value.toFixed(2) : '0.00'}
              </Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TextInput 
                style={styles.quantityInput} 
                value={String(item.quantity)} 
                editable={false} 
              />
              <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <>
          <View style={styles.iconContainer}>
            <Image 
              source={require('../../../assets/Diversos/Sacola.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
          <Text style={styles.descriptionText}>
            Navegue pelo aplicativo ou faça uma busca para encontrar seus produtos
          </Text>
        </>
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R$ {getTotalPrice()}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleCloseOrder}
      >
        <Text style={styles.buttonText}>{items.length ? "Fechar Pedido" : "Escolher produtos"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F4F6FA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: '#FFF3D3',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#8A8A8A',
    textAlign: 'center',
    marginBottom: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  productValue: {
    color: '#888',
    marginTop: 5,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#38a69d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  quantityInput: {
    width: 30,
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 16,
    backgroundColor: '#eee',
    paddingVertical: 3,
    borderRadius: 5,
  
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 18,
    color: 'red',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#38a69d',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
