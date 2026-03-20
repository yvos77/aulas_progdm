import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta, rotulo_lista_metas } from './mensagens.js';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import MetaList from './components/MetaList.js';
import MetaInput from './components/MetaInput.js';

export default function App() {

  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    setMetas([...metas, inputMeta]);
  }

  return (
    <View style={styles.mainContainer}>
      
        <MetaInput onAddMeta={adicionarMetaHandler} />

      <View style={styles.metaContainer}>
        <MetaList array={metas} />
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
    gap: 10,
  },

  metaContainer: {
    flex: 15,
    borderWidth: 1,
    borderRadius: 10,
  },

  listaTexto: {
    marginTop: 20,
  }

});
