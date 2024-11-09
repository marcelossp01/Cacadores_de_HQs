import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../pages/Home';
import Gibis from '../pages/Gibis';
import Herois from '../pages/Herois';
import Mangas from '../pages/Mangas';
import Usuarios from '../pages/Usuarios';
import Categorias from '../pages/Categorias';
import Conta from '../pages/Conta';
import Sacola from '../pages/Sacola';
import Cadastros from '../pages/Cadastros';
import WelcomeUser from '../pages/WelcomeUser';
import Publicacoes from '../pages/Publicacoes';
import ConfirmacaoPedido from '../pages/ConfirmacaoPedido';
import Concluido from '../pages/Concluido';

// Criar navegadores
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Configuração do Tab Navigator
function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categorias') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Sacola') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Conta') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#38a69d',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Categorias" component={Categorias} options={{ headerShown: false }} />
      <Tab.Screen name="Sacola" component={Sacola} options={{ headerShown: false }} />
      <Tab.Screen name="Conta" component={Conta} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Configuração do Stack Navigator
export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="TabScreens">
      <Stack.Screen name="TabScreens" component={TabScreens} options={{ headerShown: false }} />
      <Stack.Screen name="Gibis" component={Gibis} />
      <Stack.Screen name="Herois" component={Herois} />
      <Stack.Screen name="Mangas" component={Mangas} />
      <Stack.Screen name="Usuarios" component={Usuarios} />
      <Stack.Screen name="Cadastros" component={Cadastros} />
      <Stack.Screen name="WelcomeUser" component={WelcomeUser} />
      <Stack.Screen name="Publicacoes" component={Publicacoes} />
      <Stack.Screen name="ConfirmacaoPedido" component={ConfirmacaoPedido} />
      <Stack.Screen name="Concluido" component={Concluido} />

    </Stack.Navigator>
  );
}
