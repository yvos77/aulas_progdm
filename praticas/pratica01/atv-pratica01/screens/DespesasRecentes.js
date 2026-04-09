import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../store/despesas-context';

function DespesasRecentes() {
  const despesasCtx = useContext(DespesasContext);
  
  const hoje = new Date();
  const despesasRecentes = despesasCtx.despesas.filter((despesa) => {
    const dataSeteDiasAtras = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 7);
    return despesa.data >= dataSeteDiasAtras && despesa.data <= hoje;
  });

  return (
    <View style={styles.container}>
      <DespesaSaida despesas={despesasRecentes} periodo="Últimos 7 dias" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F3F3F3' },
});

export default DespesasRecentes;