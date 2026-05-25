import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { useContext, useState } from "react"
import { MoneyContext } from "../../contexts/GlobalState"
import { globalStyles } from "../../styles/globalStyles"
import { colors } from "../../constants/colors"
import { MaterialIcons } from "@expo/vector-icons"
import CategoryItem from "../../components/CategoryItem"

const ICON_OPTIONS = [
  "fastfood", "home", "work", "book", "airplanemode-active",
  "credit-card", "shopping-bag", "favorite", "directions-car",
  "local-hospital", "fitness-center", "pets", "music-note",
  "sports-soccer", "movie", "restaurant", "coffee", "beach-access"
]

const COLOR_OPTIONS = [
  "#DE9AC3", "#DEA17B", "#E6E088", "#AB8FBE", "#82C9DE",
  "#7BC8A4", "#FFB6B6", "#B6D7FF", "#FFD6A5", "#CAFFBF",
  "#FFC6FF", "#A0C4FF", "#FDFFB6", "#BDB2FF", "#FF9770"
]

export default function Categories() {
  const { categories, addCategory, removeCategory } = useContext(MoneyContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: "",
    displayName: "",
    icon: ICON_OPTIONS[0],
    background: COLOR_OPTIONS[0],
    isIncome: false,
  })

  const handleCreate = async () => {
    if (!form.name || !form.displayName) {
      Alert.alert("Erro", "Preencha todos os campos!")
      return
    }

    try {
      setSaving(true)
      await addCategory(form)
      setForm({
        name: "",
        displayName: "",
        icon: ICON_OPTIONS[0],
        background: COLOR_OPTIONS[0],
        isIncome: false,
      })
      setModalVisible(false)
      Alert.alert("Sucesso!", "Categoria criada com sucesso!")
    } catch (e) {
      Alert.alert("Erro", "Não foi possível criar a categoria.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = (item) => {
    Alert.alert(
      "Excluir categoria",
      `Deseja excluir "${item.displayName}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await removeCategory(item.id)
            } catch (e) {
              Alert.alert("Erro", "Não foi possível excluir. Verifique se há transações usando essa categoria.")
            }
          },
        },
      ]
    )
  }

  return (
    <View style={globalStyles.screenContainer}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        style={globalStyles.content}
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="add" size={20} color={colors.primaryContrast} />
            <Text style={styles.addButtonText}>Nova Categoria</Text>
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <View style={styles.categoryRow}>
            <CategoryItem category={item} />
            <View style={styles.categoryInfo}>
              <Text style={globalStyles.primaryText}>{item.displayName}</Text>
              <Text style={globalStyles.secondaryText}>
                {item.isIncome ? "Renda" : "Despesa"} •{" "}
                {item.isDefault ? "Padrão" : "Personalizada"}
              </Text>
            </View>
            {!item.isDefault && (
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <MaterialIcons name="delete" size={24} color={colors.negativeText} />
              </TouchableOpacity>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={globalStyles.line} />}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Nova Categoria</Text>

              <Text style={globalStyles.inputLabel}>Identificador (sem espaços)</Text>
              <TextInput
                style={globalStyles.input}
                value={form.name}
                onChangeText={(t) => setForm({ ...form, name: t.toLowerCase().replace(/\s/g, "_") })}
                placeholder="ex: saude"
                placeholderTextColor={colors.secondaryText}
              />

              <Text style={[globalStyles.inputLabel, { marginTop: 12 }]}>Nome para exibição</Text>
              <TextInput
                style={globalStyles.input}
                value={form.displayName}
                onChangeText={(t) => setForm({ ...form, displayName: t })}
                placeholder="ex: Saúde"
                placeholderTextColor={colors.secondaryText}
              />

              <Text style={[globalStyles.inputLabel, { marginTop: 12 }]}>Tipo</Text>
              <View style={styles.typeRow}>
                <TouchableOpacity
                  style={[styles.typeButton, !form.isIncome && styles.typeButtonActive]}
                  onPress={() => setForm({ ...form, isIncome: false })}
                >
                  <Text style={!form.isIncome ? styles.typeButtonActiveText : styles.typeButtonText}>
                    Despesa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.typeButton, form.isIncome && styles.typeButtonActive]}
                  onPress={() => setForm({ ...form, isIncome: true })}
                >
                  <Text style={form.isIncome ? styles.typeButtonActiveText : styles.typeButtonText}>
                    Renda
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={[globalStyles.inputLabel, { marginTop: 12 }]}>Ícone</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: -20 }}
                contentContainerStyle={{
                  paddingLeft: 24,
                  paddingRight: 20,
                  alignItems: "center",
                  gap: 8,
                  paddingVertical: 6,
                }}
              >
                {ICON_OPTIONS.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconOption,
                      form.icon === icon && { borderColor: colors.primary, borderWidth: 2 }
                    ]}
                    onPress={() => setForm({ ...form, icon })}
                  >
                    <MaterialIcons
                      name={icon}
                      size={28}
                      color={form.icon === icon ? colors.primary : colors.primaryText}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={[globalStyles.inputLabel, { marginTop: 12 }]}>Cor</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: -20 }}
                contentContainerStyle={{
                  paddingLeft: 24,
                  paddingRight: 20,
                  alignItems: "center",
                  gap: 8,
                  paddingVertical: 6,
                }}
              >
                {COLOR_OPTIONS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      form.background === color && styles.colorOptionSelected
                    ]}
                    onPress={() => setForm({ ...form, background: color })}
                  />
                ))}
              </ScrollView>

              <Text style={[globalStyles.inputLabel, { marginTop: 12 }]}>Preview</Text>
              <CategoryItem category={{ ...form, displayName: form.displayName || "Preview" }} />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleCreate}
                  disabled={saving}
                >
                  {saving
                    ? <ActivityIndicator color={colors.primaryContrast} />
                    : <Text style={styles.saveButtonText}>Salvar</Text>
                  }
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  addButtonText: {
    color: colors.primaryContrast,
    fontSize: 16,
    fontWeight: "600",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  categoryInfo: {
    flex: 1,
  },
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
  typeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  typeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondaryText,
    alignItems: "center",
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    color: colors.primaryText,
  },
  typeButtonActiveText: {
    color: colors.primaryContrast,
    fontWeight: "600",
  },
  iconOption: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorOptionSelected: {
    borderColor: colors.primaryText,
    transform: [{ scale: 1.2 }],
  },
  modalButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
    marginBottom: 8,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondaryText,
    alignItems: "center",
  },
  cancelButtonText: {
    color: colors.primaryText,
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  saveButtonText: {
    color: colors.primaryContrast,
    fontSize: 16,
    fontWeight: "600",
  },
})