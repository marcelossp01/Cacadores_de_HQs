import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Categorias da lista
const categories = [
  { id: '1', name: 'Gibis', screen: 'Gibis' },
  { id: '2', name: 'Mangas', screen: 'Mangas' },
  { id: '3', name: 'Herois', screen: 'Herois' },
];

// Tela principal que exibe as categorias
function Categorias() {
  const navigation = useNavigation(); // Obter o objeto navigation

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem} 
      onPress={() => navigation.navigate(item.screen)}> 
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar produtos"
      />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()} // Converter id para string
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// Componente principal que exibe apenas a tela de Categorias
export default function App() {
  return (
    <View style={styles.container}>
      <Categorias />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F5',
  },
  list: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    marginTop:50,
    borderWidth: 3,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,

  },
});
