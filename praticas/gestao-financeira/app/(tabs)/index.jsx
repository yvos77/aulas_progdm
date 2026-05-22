import { useContext, useState, useRef } from "react"
import { MoneyContext } from "../../contexts/GlobalState"
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native"
import TransactionItem from "../../components/TransactionItem"
import { globalStyles } from "../../styles/globalStyles"
import { colors } from "../../constants/colors"
import DescriptionInput from "../../components/DescriptionInput"
import CurrencyInput from "../../components/CurrencyInput"
import DatePicker from "../../components/DatePicker"
import CategoryPicker from "../../components/CategoryPicker"
import Button from "../../components/Button"
import MonthYearFilter from "../../components/MonthYearFilter"

export default function Transactions() {
  const {
    transactions,
    categories,
    loading,
    error,
    refresh,
    removeTransaction,
    updateTransaction,
  } = useContext(MoneyContext)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editForm, setEditForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const valueInputRef = useRef()

  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date)
    return (
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  })

  const handleLongPress = (item) => {
    Alert.alert(
      item.description,
      "O que deseja fazer?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Editar",
          onPress: () => {
            setEditForm({
              id: item.id,
              description: item.description,
              value: Number(item.value),
              date: new Date(item.date),
              category: item.categoryId,
            })
            setEditModalVisible(true)
          },
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
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
          },
        },
      ]
    )
  }

  const handleUpdate = async () => {
    if (!editForm.description) {
      Alert.alert("Erro", "Preencha a descrição!")
      return
    }
    if (!editForm.value || editForm.value <= 0) {
      Alert.alert("Erro", "Preencha um valor válido!")
      return
    }
    if (!editForm.category) {
      Alert.alert("Erro", "Selecione uma categoria!")
      return
    }

    try {
      setSaving(true)
      await updateTransaction(editForm.id, {
        description: editForm.description,
        value: editForm.value,
        date: editForm.date,
        categoryId: editForm.category,
      })
      setEditModalVisible(false)
      setEditForm(null)
    } catch (e) {
      Alert.alert("Erro", "Não foi possível atualizar a transação.")
    } finally {
      setSaving(false)
    }
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
      <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
        <MonthYearFilter
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item)}>
            <TransactionItem {...item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={[globalStyles.secondaryText, { textAlign: "center", marginTop: 40 }]}>
            Nenhuma transação em {selectedDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
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

      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Editar Transação</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {editForm && (
                    <View style={styles.form}>
                      <DescriptionInput
                        form={editForm}
                        setForm={setEditForm}
                        valueInputRef={valueInputRef}
                      />
                      <CurrencyInput
                        form={editForm}
                        setForm={setEditForm}
                        valueInputRef={valueInputRef}
                      />
                      <DatePicker form={editForm} setForm={setEditForm} />
                      <CategoryPicker
                        form={editForm}
                        setForm={setEditForm}
                        categories={categories}
                      />
                    </View>
                  )}
                  <Button onPress={handleUpdate}>
                    {saving ? "Salvando..." : "Salvar"}
                  </Button>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setEditModalVisible(false)
                      setEditForm(null)
                    }}
                  >
                    <Text style={styles.cancelText}>Cancelar</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.primaryContrast,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primaryText,
    marginBottom: 16,
  },
  form: {
    gap: 12,
    marginBottom: 16,
  },
  cancelButton: {
    alignItems: "center",
    padding: 12,
    marginTop: 8,
  },
  cancelText: {
    color: colors.secondaryText,
    fontSize: 16,
  },
})