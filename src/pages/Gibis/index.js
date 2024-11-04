import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const products = [
  {
    id: '1',
    name: 'Monica Teen #01',
    price: 'R$ 0,00',
    image: require('../../../assets/gibis/MonicaTeen#01.png'), // Adicione a imagem correspondente
  },
  {
    id: '2',
    name: 'Coleção Histórica Turma da Mônica - Volume 15',
    price: 'R$ 0,00',
    image: require('../../../assets/gibis/Volume15.png'), // Adicione a imagem correspondente
  },
  {
    id: '3',
    name: 'Coleção Histórica Turma da Mônica - Volume 23',
    price: 'R$ 0,00',
    image: require('../../../assets/gibis/volume23.png'), // Adicione a imagem correspondente
  },
  {
    id: '4',
    name: 'Coleção Histórica Turma da Mônica - Volume 37',
    price: 'R$ ,00',
    image: require('../../../assets/gibis/volume37.png'), // Adicione a imagem correspondente
  },
  {
    id: '5',
    name: 'Mickey # 044',
    price: 'R$ ,00',
    image: require('../../../assets/gibis/Mickey#044.png'), // Adicione a imagem correspondente
  },
  {
    id: '6',
    name: 'Mickey # 249',
    price: 'R$ ,00',
    image: require('../../../assets/gibis/Mickey#249.png'), // Adicione a imagem correspondente
  },
  {
    id: '7',
    name: 'Mágico Vento nº1 a 100 HQ em ótimo estado',
    price: 'R$ 0,00',
    image: require('../../../assets/gibis/magico_vento_n1_a_100_hq_em_otimo_estado.png'), // Adicione a imagem correspondente
  },
  {
    id: '8',
    name: 'Mandrake Coleção #35',
    price: 'R$ 0,00',
    image: require('../../../assets/gibis/MandrakeColeção#35.png'), // Adicione a imagem correspondente
  },
  {
    id: '9',
    name: 'Tio Patinhas # 183',
    price: 'R$ 0,00',
    image: require('../../../assets/gibis/Tio Patinhas#183.png'), // Adicione a imagem correspondente
  },
  {
    id: '10',
    name: 'Tio Patinhas # 095',
    price: 'R$ 0,00',
    image: require('../../../assets/gibis/TioPatinhas#095.png'), // Adicione a imagem correspondente
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
