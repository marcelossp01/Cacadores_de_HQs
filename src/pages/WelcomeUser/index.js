import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar o hook de navegação

export default function WelcomeUser() {
  const navigation = useNavigation(); // Acessar o navigation
  
  return (
    <View style={styles.container}>
      {/* Logotipo no topo */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../../../assets/logo_conta.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Texto abaixo do logotipo */}
      <Text style={styles.text}>Usuário Cadastrado Com Sucesso</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',  
    backgroundColor: '#F0F0F5',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: -50,  
    marginBottom: 20, 
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});
