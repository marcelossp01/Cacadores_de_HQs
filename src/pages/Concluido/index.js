import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar o hook de navegação

export default function Concluido() {
  const navigation = useNavigation(); // Acessar o navigation
  
  return (
    <View style={styles.container}>
      {/* Logotipo clicável */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../../../assets/logo_conta.png')}
          style={styles.logo}
          resizeMode="contain"  // Usar um valor válido para resizeMode
        />
      </TouchableOpacity>

      <Text style={styles.text}>Pagamento Realizado com Sucesso</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',  // Deixa os itens no topo
    backgroundColor: '#F0F0F5',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,  // Pequeno ajuste para mais consistência
  },
  text:{
    fontSize: 18,
    fontWeight: 'bold',
  }
});
