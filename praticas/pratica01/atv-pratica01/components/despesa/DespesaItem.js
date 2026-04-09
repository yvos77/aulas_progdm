import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function getDataFormatada(data) {
   
  return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
}

function DespesaItem({ id, descricao, valor, data }) {
  const navigation = useNavigation();

  function aoPressionarDespesa() {
    navigation.navigate('GerenciarDespesa', {
      despesaId: id 
    });
  }

  return (
    <Pressable
      onPress={aoPressionarDespesa}
      style={({ pressed }) => pressed && styles.pressed}
      >
      <View style={styles.item}>
        <View>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#3b82f6', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3, 
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  descricao: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'white'
  },
  data: {
    fontSize: 14,
    color: 'white'
  },
  valorContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80
  },
  valor: {
    color: '#3b82f6',
    fontWeight: 'bold',
  }
});

export default DespesaItem;