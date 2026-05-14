import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from "react-native"
import { globalStyles } from "../../styles/globalStyles"
import Button from "../../components/Button"
import { useContext, useRef, useState } from "react"
import DescriptionInput from "../../components/DescriptionInput"
import CurrencyInput from "../../components/CurrencyInput"
import DatePicker from "../../components/DatePicker"
import CategoryPicker from "../../components/CategoryPicker"
import { MoneyContext } from "../../contexts/GlobalState"

const initialForm = {
  description: "",
  value: 0,
  date: new Date(),
  category: null,
}

export default function AddTransactions() {
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)
  const valueInputRef = useRef()
  const { categories, addTransaction } = useContext(MoneyContext)

  const addTransactionHandler = async () => {
    if (!form.description) {
      Alert.alert("Erro", "Preencha a descrição!")
      return
    }
    if (!form.value || form.value <= 0) {
      Alert.alert("Erro", "Preencha um valor válido!")
      return
    }
    if (!form.category) {
      Alert.alert("Erro", "Selecione uma categoria!")
      return
    }

    try {
      setSaving(true)
      await addTransaction({
        description: form.description,
        value: form.value,
        date: form.date,
        categoryId: form.category,
      })
      setForm(initialForm)
      Alert.alert("Sucesso!", "Transação adicionada com sucesso!")
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar a transação.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={globalStyles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={globalStyles.content}>
          <View style={styles.form}>
            <DescriptionInput
              form={form}
              setForm={setForm}
              valueInputRef={valueInputRef}
            />
            <CurrencyInput
              form={form}
              setForm={setForm}
              valueInputRef={valueInputRef}
            />
            <DatePicker form={form} setForm={setForm} />
            <CategoryPicker
              form={form}
              setForm={setForm}
              categories={categories}
            />
          </View>
          <Button onPress={addTransactionHandler}>
            {saving ? <ActivityIndicator color="white" /> : "Adicionar"}
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
    marginBottom: 40,
    marginTop: 10,
  },
})