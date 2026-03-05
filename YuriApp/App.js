{/*import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta, rotulo_lista_metas } from './mensagens.js';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <TextInput placeholder={rotulo_input_meta}/>
      <Button title={rotulo_btn_cadastro_meta} />
      <Text>{rotulo_lista_metas}</Text>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ffffff',
  }
});
*/}

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, SafeAreaView } from 'react-native-safe-area-context';
import { rotulo_btn_cadastro_meta, rotulo_input_meta, rotulo_lista_metas } from './mensagens.js';

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TextInput placeholder={rotulo_input_meta}/>
      <Button title={rotulo_btn_cadastro_meta} />
      <Text>{rotulo_lista_metas}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ffffff',
  }
});