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
import { useState } from "react"

export default function CategoryPicker({ form, setForm, categories = [] }) {
  const [showPicker, setShowPicker] = useState(false)

  const selectedCategory = categories.find(
    (cat) => cat.id === form.category
  )

  const picker = (
    <Picker
      selectedValue={form.category}
      onValueChange={(itemValue) => {
        setForm({ ...form, category: itemValue })
        if (Platform.OS === "android") setShowPicker(false)
      }}
    >
      {categories.map((cat) => (
        <Picker.Item
          key={cat.id}
          label={cat.displayName}
          value={cat.id}
          color={colors.primaryText}
        />
      ))}
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