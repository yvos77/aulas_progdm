import { useContext } from "react"
import { MoneyContext } from "../../contexts/GlobalState"
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native"
import TransactionItem from "../../components/TransactionItem"
import { globalStyles } from "../../styles/globalStyles"
import { colors } from "../../constants/colors"

export default function Transactions() {
  const { transactions, loading, error, refresh, removeTransaction } =
    useContext(MoneyContext)

  const handleLongPress = (item) => {
    Alert.alert(
      "Excluir transação",
      `Deseja excluir "${item.description}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => removeTransaction(item.id),
        },
      ]
    )
  }

  if (loading) {
    return (
      <View style={[globalStyles.screenContainer, { alignItems: "center", justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={[globalStyles.screenContainer, { alignItems: "center", justifyContent: "center", padding: 20 }]}>
        <Text style={globalStyles.secondaryText}>{error}</Text>
        <TouchableOpacity onPress={refresh} style={{ marginTop: 16 }}>
          <Text style={{ color: colors.primary, fontSize: 16 }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={globalStyles.screenContainer}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item)}>
            <TransactionItem {...item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={globalStyles.secondaryText}>
            Ainda não há nenhum item!
          </Text>
        }
        style={globalStyles.content}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            colors={[colors.primary]}
          />
        }
      />
    </View>
  )
}