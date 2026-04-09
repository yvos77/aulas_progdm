import { createContext, useState } from 'react';

export const DespesasContext = createContext({
  despesas: [],
  adicionarDespesa: ({ descricao, valor, data }) => {},
  removerDespesa: (id) => {},
});

function DespesasContextProvider({ children }) {
  const [estadoDespesas, setEstadoDespesas] = useState([]);

  function adicionarDespesa(dadosDespesa) {
    setEstadoDespesas((despesasAtuais) => {
      const idUnico = new Date().toString() + Math.random().toString();
      const novaDespesa = { ...dadosDespesa, id: idUnico };
      return [novaDespesa, ...despesasAtuais];
    });
  }

  function removerDespesa(id) {
    setEstadoDespesas((despesasAtuais) => {

      return despesasAtuais.filter((despesa) => despesa.id !== id);
    });
  }

  const valorContexto = {
    despesas: estadoDespesas,
    adicionarDespesa: adicionarDespesa,
    removerDespesa: removerDespesa,
  };

  return (
    <DespesasContext.Provider value={valorContexto}>
      {children}
    </DespesasContext.Provider>
  );
}

export default DespesasContextProvider;