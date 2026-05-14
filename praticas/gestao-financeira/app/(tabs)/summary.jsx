import { useContext, useMemo } from "react"
import { MoneyContext } from "../../contexts/GlobalState"
import { globalStyles } from "../../styles/globalStyles"
import SummaryItem from "../../components/SummaryItem"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { colors } from "../../constants/colors"

export default function Summary() {
  const { transactions, categories, loading } = useContext(MoneyContext)

  const totals = useMemo(() => {
    const map = {}
    let sum = 0

    for (const item of transactions) {
      const cat = categories.find((c) => c.id === item.categoryId)
      if (!cat) continue

      if (!map[cat.id]) map[cat.id] = 0
      map[cat.id] += Number(item.value)

      if (cat.isIncome) {
        sum += Number(item.value)
      } else {
        sum -= Number(item.value)
      }
    }

    return { map, sum }
  }, [transactions, categories])

  const incomeCategories = categories.filter((c) => c.isIncome)
  const expenseCategories = categories.filter((c) => !c.isIncome)

  const valueStyle =
    totals.sum > 0 ? globalStyles.positiveText : globalStyles.negativeText

  if (loading) {
    return (
      <View style={[globalStyles.screenContainer, { alignItems: "center", justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <View style={globalStyles.screenContainer}>
      <View style={globalStyles.content}>

        {/* Renda */}
        {incomeCategories.map((cat) => (
          <SummaryItem
            key={cat.id}
            category={cat}
            value={totals.map[cat.id] ?? 0}
          />
        ))}

        <View style={globalStyles.line} />

        {/* Despesas */}
        {expenseCategories.map((cat) => (
          <SummaryItem
            key={cat.id}
            category={cat}
            value={totals.map[cat.id] ?? 0}
          />
        ))}

        <View style={globalStyles.line} />

        {/* Saldo */}
        <View style={styles.balance}>
          <Text style={styles.balanceText}>Saldo</Text>
          <Text style={valueStyle}>
            {totals.sum.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  balance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceText: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: "800",
  },
})