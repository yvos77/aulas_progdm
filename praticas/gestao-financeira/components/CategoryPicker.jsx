import { Picker } from "@react-native-picker/picker"
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { globalStyles } from "../styles/globalStyles"
import { colors } from "../constants/colors"
import { categories } from "../constants/categories"
import { useState } from "react"

export default function CategoryPicker({ form, setForm }) {
  const [showPicker, setShowPicker] = useState(false)

  const selectedCategory = Object.values(categories).find(
    (cat) => cat.name === form.category
  )

  const picker = (
    <Picker
      selectedValue={form.category}
      onValueChange={(itemValue) => {
        setForm({ ...form, category: itemValue })
        if (Platform.OS === "android") setShowPicker(false)
      }}
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
  )

  return (
    <View>
      <Text style={globalStyles.inputLabel}>Categoria</Text>

      {Platform.OS === "android" ? (
        <View style={styles.pickerAndroid}>{picker}</View>
      ) : (
        <>
          <TouchableOpacity
            style={globalStyles.input}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.categoryText}>
              {selectedCategory ? selectedCategory.displayName : "Selecione"}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={showPicker}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalDone}
                  onPress={() => setShowPicker(false)}
                >
                  <Text style={styles.modalDoneText}>Confirmar</Text>
                </TouchableOpacity>
                {picker}
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  pickerAndroid: {
    borderColor: colors.secondaryText,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    height: 44,
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