import {
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native"
import { globalStyles } from "../../styles/globalStyles"
import { useState } from "react"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from "@react-native-picker/picker"
import { categories } from "../../constants/categories"
import { colors } from "../../constants/colors"
import Button from "../../components/Button"

export default function AddTransactions() {
  const initialForm = {
    description: "",
    value: 0,
    date: new Date(),
    category: "income",
  }

  const [form, setForm] = useState(initialForm)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)

  const addTransaction = () => {
    Alert.alert(
      `${form.description} | ${form.value} | ${form.date} | ${form.category}`
    )
  }

  const handleCurrencyChange = (text) => {
    const formattedValue = text.replace(/\D/g, "")
    const numberValue = formattedValue ? parseFloat(formattedValue) / 100 : 0
    setForm({ ...form, value: numberValue })
  }

  const handleDateChange = (_, selectDate) => {
    if (selectDate) {
      setForm({ ...form, date: selectDate })
    }
  }

  const selectedCategory = Object.values(categories).find(
    (cat) => cat.name === form.category
  )

  return (
    <View style={globalStyles.screenContainer}>
      <ScrollView style={globalStyles.content}>
        <View style={styles.form}>
          <View>
            <Text style={globalStyles.inputLabel}>Descrição</Text>
            <TextInput
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
              style={globalStyles.input}
            />
          </View>

          <View>
            <Text style={globalStyles.inputLabel}>Valor</Text>
            <TextInput
              value={form.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              onChangeText={handleCurrencyChange}
              keyboardType="numeric"
              style={globalStyles.input}
            />
          </View>

          <View>
            <Text style={globalStyles.inputLabel}>Data</Text>
            <TouchableOpacity
              style={globalStyles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.categoryText}>
                {form.date.toLocaleDateString("pt-BR")}
              </Text>
            </TouchableOpacity>

            <Modal
              visible={showDatePicker}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.modalDone}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.modalDoneText}>Confirmar</Text>
                  </TouchableOpacity>
                  <RNDateTimePicker
                    mode="date"
                    display="spinner"
                    value={form.date}
                    onChange={handleDateChange}
                    locale="pt-BR"
                    textColor={colors.primaryText}
                  />
                </View>
              </View>
            </Modal>
          </View>

          <View>
            <Text style={globalStyles.inputLabel}>Categoria</Text>
            <TouchableOpacity
              style={globalStyles.input}
              onPress={() => setShowCategoryPicker(true)}
            >
              <Text style={styles.categoryText}>
                {selectedCategory ? selectedCategory.displayName : "Selecione"}
              </Text>
            </TouchableOpacity>

            <Modal
              visible={showCategoryPicker}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.modalDone}
                    onPress={() => setShowCategoryPicker(false)}
                  >
                    <Text style={styles.modalDoneText}>Confirmar</Text>
                  </TouchableOpacity>
                  <Picker
                    selectedValue={form.category}
                    onValueChange={(itemValue) =>
                      setForm({ ...form, category: itemValue })
                    }
                  >
                    <Picker.Item
                      label={categories.income.displayName}
                      value={categories.income.name}
                      color={colors.primaryText}
                    />
                    <Picker.Item
                      label={categories.food.displayName}
                      value={categories.food.name}
                      color={colors.primaryText}
                    />
                    <Picker.Item
                      label={categories.house.displayName}
                      value={categories.house.name}
                      color={colors.primaryText}
                    />
                    <Picker.Item
                      label={categories.education.displayName}
                      value={categories.education.name}
                      color={colors.primaryText}
                    />
                    <Picker.Item
                      label={categories.travel.displayName}
                      value={categories.travel.name}
                      color={colors.primaryText}
                    />
                  </Picker>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <Button onPress={addTransaction}>Adicionar</Button>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
    marginBottom: 40,
    marginTop: 10,
  },
  categoryText: {
    lineHeight: 40,
    color: colors.primaryText,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: colors.primaryContrast,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  modalDone: {
    alignItems: "flex-end",
    padding: 16,
  },
  modalDoneText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
})