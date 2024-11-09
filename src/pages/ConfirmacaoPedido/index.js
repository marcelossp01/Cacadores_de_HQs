import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmacaoPedido() {
  const pixCode = "00020101021226860014BR.GOV.BCB.PIX..."; // Substitua pelo código Pix real
  const navigation = useNavigation(); // Hook para navegação

  // Função para copiar o código Pix
  const copyPixCode = () => {
    Clipboard.setString(pixCode);
    Alert.alert("Código Pix copiado!", "O código Pix foi copiado para a área de transferência.");
  };

  // Função para concluir o pedido
  const handleCloseOrder = () => {
    // Aqui você pode adicionar a lógica de navegação dependendo de outras condições
    navigation.navigate('Concluido', { total: 'Valor do Pedido' }); // Substitua 'Valor do Pedido' conforme necessário
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Caro cliente, recebemos seu pedido. Para finalizar sua compra é só pagar com Pix!
      </Text>

      <Text style={styles.subheaderText}>Pagamento via Pix</Text>
      <Text style={styles.instructionText}>
        Escaneie o código QR com a câmera do seu celular ou copie e cole o código no aplicativo do seu banco.
      </Text>

      <View style={styles.pixCodeContainer}>
        <Text style={styles.pixCodeText}>{pixCode}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={copyPixCode}>
          <Text style={styles.copyButtonText}>Copiar código Pix</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.validityText}>O código é válido até às 05:22.</Text>

      <View style={styles.qrCodeContainer}>
        <QRCode
          value={pixCode}
          size={200}
        />
      </View>

      {/* Botão Concluir Pedido */}
      <TouchableOpacity style={styles.concludeButton} onPress={handleCloseOrder}>
        <Text style={styles.concludeButtonText}>Concluir Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheaderText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginTop: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  pixCodeContainer: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  pixCodeText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  copyButton: {
    backgroundColor: '#38a69d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  validityText: {
    color: '#777',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  qrCodeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  concludeButton: {
    backgroundColor: '#38a69d',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  concludeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
