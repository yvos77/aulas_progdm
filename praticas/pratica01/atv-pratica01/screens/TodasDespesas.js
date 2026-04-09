import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../store/despesas-context';

function TodasDespesas() {

  const despesasCtx = useContext(DespesasContext);

  return (
    <View style={styles.container}>
      <DespesaSaida 
        despesas={despesasCtx.despesas}
        periodo="Total" 
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F3F3F3' },
});

export default TodasDespesas; 