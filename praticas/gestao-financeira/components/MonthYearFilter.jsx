import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "../constants/colors"
import { useState } from "react"

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - 5 + i)

export default function MonthYearFilter({ selectedDate, onChange }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [tempMonth, setTempMonth] = useState(selectedDate.getMonth())
  const [tempYear, setTempYear] = useState(selectedDate.getFullYear())

  const goToPreviousMonth = () => {
    const prev = new Date(selectedDate)
    prev.setMonth(prev.getMonth() - 1)
    onChange(prev)
  }

  const goToNextMonth = () => {
    const next = new Date(selectedDate)
    next.setMonth(next.getMonth() + 1)
    onChange(next)
  }

  const handleOpen = () => {
    setTempMonth(selectedDate.getMonth())
    setTempYear(selectedDate.getFullYear())
    setModalVisible(true)
  }

  const handleConfirm = () => {
    const newDate = new Date(tempYear, tempMonth, 1)
    onChange(newDate)
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToPreviousMonth} style={styles.arrow}>
        <MaterialIcons name="chevron-left" size={28} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleOpen} style={styles.labelButton}>
        <Text style={styles.label}>
          {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={20} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={goToNextMonth} style={styles.arrow}>
        <MaterialIcons name="chevron-right" size={28} color={colors.primary} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Selecionar período</Text>
                  <TouchableOpacity onPress={handleConfirm}>
                    <Text style={styles.confirmText}>Confirmar</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.pickersRow}>
                  {/* Seletor de Mês */}
                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerLabel}>Mês</Text>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                      {MONTH_NAMES.map((name, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.optionButton,
                            tempMonth === index && styles.optionButtonActive
                          ]}
                          onPress={() => setTempMonth(index)}
                        >
                          <Text style={[
                            styles.optionText,
                            tempMonth === index && styles.optionTextActive
                          ]}>
                            {name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  {/* Divisor */}
                  <View style={styles.divider} />

                  {/* Seletor de Ano */}
                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerLabel}>Ano</Text>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                      {YEARS.map((year) => (
                        <TouchableOpacity
                          key={year}
                          style={[
                            styles.optionButton,
                            tempYear === year && styles.optionButtonActive
                          ]}
                          onPress={() => setTempYear(year)}
                        >
                          <Text style={[
                            styles.optionText,
                            tempYear === year && styles.optionTextActive
                          ]}>
                            {String(year)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#B1B1B133",
  },
  arrow: {
    padding: 4,
  },
  labelButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#B1B1B133",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
  },
  cancelText: {
    fontSize: 16,
    color: "#B1B1B1",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  pickersRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  pickerColumn: {
    flex: 1,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 13,
    color: "#B1B1B1",
    marginBottom: 8,
    fontWeight: "600",
  },
  scroll: {
    width: "100%",
    maxHeight: 220,
  },
  divider: {
    width: 1,
    backgroundColor: "#B1B1B133",
    marginHorizontal: 8,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
    alignItems: "center",
  },
  optionButtonActive: {
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 15,
    color: "#666666",
  },
  optionTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
})