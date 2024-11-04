import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function SacolaVazia({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Título da Sacola */}
      <Text style={styles.title}>Sacola (0)</Text>

      {/* Ícone de Sacola */}
      <View style={styles.iconContainer}>
        <Image 
          source={require('../../../assets/Diversos/Sacola.png')} // Substitua pelo caminho correto do ícone
          style={styles.icon}
        />
      </View>

      {/* Texto informativo */}
      <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
      <Text style={styles.descriptionText}>
        Navegue pelo aplicativo ou faça uma busca para encontrar seus produtos
      </Text>

      {/* Botão para escolher produtos */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')} // Navega para a tela de produtos
      >
        <Text style={styles.buttonText}>Escolher produtos</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6FA', // Cor de fundo semelhante à imagem
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: '#FFF3D3', // Fundo amarelo claro para o ícone
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50, // Ajuste o tamanho conforme o ícone que você usar
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#8A8A8A',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#5C61F4', // Cor do botão
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
