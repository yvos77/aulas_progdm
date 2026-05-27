import { useContext, useMemo, useState } from "react"
import { MoneyContext } from "../../contexts/GlobalState"
import { globalStyles } from "../../styles/globalStyles"
import SummaryItem from "../../components/SummaryItem"
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { colors } from "../../constants/colors"
import MonthYearFilter from "../../components/MonthYearFilter"
import { PieChart } from "react-native-chart-kit"

const SCREEN_WIDTH = Dimensions.get("window").width

export default function Summary() {
  const { transactions, categories, loading } = useContext(MoneyContext)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const totals = useMemo(() => {
    const map = {}
    let sum = 0

    const filtered = transactions.filter((t) => {
      const date = new Date(t.date)
      return (
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      )
    })

    for (const item of filtered) {
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
  }, [transactions, categories, selectedDate])

  const expenseCategories = categories.filter((c) => !c.isIncome)
  const incomeCategories = categories.filter((c) => c.isIncome)

  const pieData = expenseCategories
    .filter((cat) => (totals.map[cat.id] ?? 0) > 0)
    .map((cat) => ({
      name: cat.displayName,
      value: totals.map[cat.id],
      color: cat.background,
      legendFontColor: colors.primaryText,
      legendFontSize: 13,
    }))

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
      <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
        <MonthYearFilter
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </View>

      <ScrollView style={globalStyles.content}>
        {pieData.length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Distribuição de Despesas</Text>
            <PieChart
              data={pieData}
              width={SCREEN_WIDTH - 40}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute={false}
            />
          </View>
        )}

        {incomeCategories.map((cat) => (
          <SummaryItem
            key={cat.id}
            category={cat}
            value={totals.map[cat.id] ?? 0}
          />
        ))}

        <View style={globalStyles.line} />

        {expenseCategories.map((cat) => (
          <SummaryItem
            key={cat.id}
            category={cat}
            value={totals.map[cat.id] ?? 0}
          />
        ))}

        <View style={globalStyles.line} />

        <View style={styles.balance}>
          <Text style={styles.balanceText}>Saldo</Text>
          <Text style={valueStyle}>
            {totals.sum.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: colors.primaryContrast,
    borderRadius: 12,
    paddingVertical: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 8,
  },
  balance: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceText: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: "800",
  },
})