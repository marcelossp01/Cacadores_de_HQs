import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const products = [
  {
    id: '1',
    name: 'X-Men #55 Agosto 96 Edição Americana',
    price: 'R$ ,00',
    image: require('../../../assets/herois/x-men_#55_agosto_96_edição_americana.png'), // Adicione a imagem correspondente
  },
  {
    id: '2',
    name: 'Almanaque do Homem Aranha 1976',
    price: 'R$ ,00',
    image: require('../../../assets/herois/Almanaque_do_Homem_Aranha_1976.png'), // Adicione a imagem correspondente
  },
  {
    id: '3',
    name: 'Super-Homem - 1ª Série # 014',
    price: 'R$ ,00',
    image: require('../../../assets/herois/SuperHomem1ªSerie#014.png'), // Adicione a imagem correspondente
  },
  {
    id: '4',
    name: 'Super Powers # 27',
    price: 'R$ ,00',
    image: require('../../../assets/herois/SuperPowers#27.png'), // Adicione a imagem correspondente
  },
  {
    id: '5',
    name: 'Hulk Contra o Mundo # 3',
    price: 'R$ ,00',
    image: require('../../../assets/herois/HulkContraoMundo#3.png'), // Adicione a imagem correspondente
  },
  {
    id: '6',
    name: 'Batman e Mulher-Gato - Rastro de Pólvora # 1',
    price: 'R$ ,00',
    image: require('../../../assets/herois/BatmaneMulherGatoRastrodePolvora#1.png'), // Adicione a imagem correspondente
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
