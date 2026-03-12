import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta, rotulo_lista_metas } from './mensagens.js';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.formContainer}>
          <TextInput style={styles.inputText} placeholder={rotulo_input_meta}/>
        </View>
        <View>
          <Button title={rotulo_btn_cadastro_meta} />
        </View>
      </View>
      <View>
        <Text style={styles.listaTexto}>{rotulo_lista_metas}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    backgroundColor: '#fff',
  },

  formContainer: {
    flexDirection: 'row',
    gap: 10
  },

  inputText: {
    flex: 1,
    borderColor: '#ccccc',
    borderWidth: 1,
    padding: 10
  },

  listaTexto: {
    marginTop: 20
  }

});
