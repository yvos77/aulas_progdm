import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { globalStyles } from "../styles/globalStyles"
import { useState } from "react"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { colors } from "../constants/colors"

export default function DatePicker({ form, setForm }) {
  const [showPicker, setShowPicker] = useState(false)

  const handleDateChange = (_, selectDate) => {
    if (Platform.OS === "android") {
      setShowPicker(false)
    }
    if (selectDate) {
      setForm({ ...form, date: selectDate })
    }
  }

  return (
    <View>
      <Text style={globalStyles.inputLabel}>Data</Text>
      <TouchableOpacity
        style={globalStyles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>
          {form.date.toLocaleDateString("pt-BR")}
        </Text>
      </TouchableOpacity>

      {Platform.OS === "android" ? (
        showPicker && (
          <RNDateTimePicker
            mode="date"
            display="default"
            value={form.date}
            onChange={handleDateChange}
          />
        )
      ) : (
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dateText: {
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