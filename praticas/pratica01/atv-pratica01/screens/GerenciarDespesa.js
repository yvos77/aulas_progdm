import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Pressable, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { DespesasContext } from '../store/despesas-context';
import IconButton from '../components/IconButton';

function GerenciarDespesa({ route, navigation }) {
  const despesasCtx = useContext(DespesasContext);

  const idDespesaEditada = route.params?.despesaId;
  const eEdicao = !!idDespesaEditada;

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  function apagarDespesa() {
    despesasCtx.removerDespesa(idDespesaEditada);
    navigation.goBack();
  }

  function confirmarDespesa() {
    const valorDespesa = parseFloat(valor.replace(',', '.')); 
    
    if (descricao.trim().length === 0 || isNaN(valorDespesa) || valorDespesa <= 0) {
      Alert.alert('Dados Inválidos', 'Por favor, insere uma descrição válida e um valor maior que zero.');
      return;
    }

    despesasCtx.adicionarDespesa({
      descricao: descricao,
      valor: valorDespesa,
      data: data
    });

    navigation.goBack(); 
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.label}>Descrição:</Text>
      <TextInput 
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Supermercado"
      />

      <Text style={styles.label}>Valor (R$):</Text>
      <TextInput 
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="decimal-pad"
        placeholder="Ex: 50.00"
      />

      <Text style={styles.label}>Data da Despesa:</Text>
      <Pressable onPress={() => setShowPicker(true)}>
        <View style={styles.dateInput}>
          <Text style={styles.dateText}>
            {data.getDate()}/{data.getMonth() + 1}/{data.getFullYear()}
          </Text>
        </View>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      <View style={styles.botoesContainer}>
        <View style={styles.botao}>
          <Button title="Cancelar" color="#f31282" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.botao}>
          {/* O texto do botão muda se for edição ou adição */}
          <Button title={eEdicao ? 'Atualizar' : 'Adicionar'} onPress={confirmarDespesa} />
        </View>
      </View>

      {/* AQUI ESTAVA A FALTAR: A lixeira só aparece se formos apagar uma despesa existente (eEdicao for verdadeiro) */}
      {eEdicao && (
        <View style={styles.apagarContainer}>
          <IconButton
            icon="trash"
            color="#f31282"
            size={36}
            onPress={apagarDespesa}
          />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F3F3F3',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 16,
  },
  dateInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  apagarContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    alignItems: 'center',
  }
});

export default GerenciarDespesa;