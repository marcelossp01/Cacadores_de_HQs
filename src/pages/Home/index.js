import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (route.params?.newProducts) {
      setProducts((prevProducts) => [...prevProducts, ...route.params.newProducts]);
    }
  }, [route.params?.newProducts]);

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

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const carouselData = [
    { id: '1', image: require('../../../assets/gibis/carrosel.png') },
    { id: '2', image: require('../../../assets/mangas/carrosel2.png') },
    { id: '3', image: require('../../../assets/herois/carrosel3.png') },
  ];

  const handleItemPress = (itemId) => {
    if (itemId === '1') {
      navigation.navigate('Gibis');
    } else if (itemId === '2') {
      navigation.navigate('Mangas');
    } else if (itemId === '3') {
      navigation.navigate('Herois');
    }
  };

  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
      <Image source={item.image} style={styles.carouselImage} resizeMode="contain" />
    </TouchableOpacity>
  );

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = Math.floor(contentOffsetX / viewSize);
    setActiveIndex(currentIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselData.length;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleBuy = (item) => {
    console.log(`Produto ${item.name} comprado!`);
    // Navega para a tela 'Sacola' e passa o produto e a imagem
    navigation.navigate('Sacola', { selectedProduct: item });
  };  
  

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productValue}>R$ {item.value}</Text>
      <TouchableOpacity style={styles.buyButton} onPress={() => handleBuy(item)}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Logo_Branco.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.searchSection}>
        <Image
          source={require('../../../assets/lupa.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produtos..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <Text style={styles.title}>Heróis, vilões, lendas e mitos. Quem você será hoje</Text>

      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        style={styles.carousel}
      />

      <View style={styles.indicatorContainer}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, { opacity: index === activeIndex ? 1 : 0.3 }]}
          />
        ))}
      </View>

      <Text style={styles.productListTitle}>Produtos Recentes:</Text>
      <FlatList
        data={userProducts}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.productList}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    paddingTop: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: -30,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 3,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: '100%',
  },
  searchIcon: {
    width: 40,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  carousel: {
    marginTop: -10,
    marginBottom: 40,
  },
  carouselImage: {
    width: Dimensions.get('window').width - 60,
    height: 250,
    marginRight: 20,
    borderRadius: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -50,
  },
  indicator: {
    height: 4,
    width: 18,
    borderRadius: 4,
    backgroundColor: '#38a69d',
    marginHorizontal: 5,
  },
  productListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productList: {
    width: '100%',
    maxHeight: 300,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 60,
    marginBottom: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 250,
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

export default Home;
