import { FlatList } from 'react-native';

import DespesaItem from './DespesaItem';

function renderDespesaItem(itemData) {

  return (
    <DespesaItem 
      id={itemData.item.id}
      descricao={itemData.item.descricao} 
      valor={itemData.item.valor} 
      data={itemData.item.data} 
    />
  );
}

function DespesaLista({ despesas }) {
  return (
    <FlatList 
      data={despesas} 
      renderItem={renderDespesaItem} 
      keyExtractor={(item) => item.id} 
    />
  );
}

export default DespesaLista;