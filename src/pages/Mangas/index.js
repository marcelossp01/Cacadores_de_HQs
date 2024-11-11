import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const products = [
  {
    id: '1',
    name: 'Chainsaw Man #02',
    price: 'R$ ,00',
    image: require('../../../assets/mangas/ChainsawMan#02.png'),
  },
  {
    id: '2',
    name: 'Chainsaw Man #04',
    price: 'R$ ,00',
    image: require('../../../assets/mangas/ChainsawMan#04.png'), 
  },
  {
    id: '3',
    name: 'Demon Slayer Kimetsu No Yaiba #03',
    price: 'R$ ,00',
    image: require('../../../assets/mangas/DemonSlayerKimetsuNoYaiba#03.png'), 
  },
  {
    id: '4',
    name: 'Solo Leveling #1',
    price: 'R$ ,00',
    image: require('../../../assets/mangas/SoloLeveling#1.png'), 
  },
  {
    id: '5',
    name: 'Pokemon Yellow #1',
    price: 'R$ ,00',
    image: require('../../../assets/mangas/PokemonYellow#1.png'), 
  },
  {
    id: '6',
    name: 'Pokémon - Yellow # 2',
    price: 'R$ ,00',
    image: require('../../../assets/mangas/PokemonYellow#2.png'), 
  },
];

const ProductList = () => {
  // Renderiza cada produto
  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mais Vendidos</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2} // Para mostrar dois produtos por linha
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 230,
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#4A3FAB',
  },
  buyButton: {
    backgroundColor: '#38a69d',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductList;
