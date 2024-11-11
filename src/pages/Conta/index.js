import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar o hook de navegação

export default function Conta() {
  const navigation = useNavigation(); // Acessar o navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação
    if (email === 'Teste' && password === 'Teste') {
      // Limpa os campos de e-mail e senha
      setEmail('');
      setPassword('');

      // Redireciona para a tela de usuários
      navigation.navigate('Usuarios');
    } else {
      alert('E-mail ou senha incorretos');
    }
  };

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

      {/* Texto de boas-vindas */}
      <Text style={styles.title}>
        Para uma melhor experiência, entre ou cadastre-se
      </Text>

      {/* Botão de cadastro */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastros')}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Entrar com e-mail */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Já sou Cadastrado</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,  // Ajuste o espaçamento do topo para dar mais respiro
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',  // Para não centralizar todos os itens
    backgroundColor: '#F0F0F5',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,  // Pequeno ajuste para mais consistência
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,  // Aumente um pouco a distância abaixo do título
    color: '#333',
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 40,  // Reduzido para deixar mais próximo ao campo de login
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  formContainer: {
    width: '100%',
    marginTop: 40,  // Reduzido para aproximar o formulário do botão de cadastro
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,  // Aumentado para separar o título dos campos
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
});
