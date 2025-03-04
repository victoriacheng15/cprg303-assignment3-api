import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import DayInput from "../components/DayInput";
import Loading from "../components/Loading";
import DateFact from "../components/DateFact";
import ValidationMessage from "../components/ValidationMessage";
import ApiErrorMessage from "../components/ApiErrorMessage";
import useFetchDateFact from "../hooks/useFetchDateFact";
import { months } from "../utils/months";

export default function Home() {
  const { fetchDateFact, dateFact, loading, error } = useFetchDateFact();
  const [inputMonth, setInputMonth] = useState("");
  const [inputDay, setInputDay] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [validationError, setValidationError] = useState("");

  const validateAndFetchFact = async (month: string, day: string) => {
    if (!month || !day) {
      setValidationError("");
      return;
    }

    const selectedMonth = months.find((m) => m.value === month);
    if (!selectedMonth) return;

    const dayNum = Number(day);

    if (Number.isNaN(dayNum) || dayNum < 1 || dayNum > selectedMonth.days) {
      setValidationError(`Please enter a valid day (1-${selectedMonth.days}).`);
      return;
    }

    setValidationError("");
    await fetchDateFact(month, day);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Date Fact Finder!</Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdown}
      >
        <Text style={styles.dropdownText}>
          {inputMonth
            ? months.find((m) => m.value === inputMonth)?.label
            : "Select a Month"}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={months}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.monthItem}
                  onPress={() => {
                    setInputMonth(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.monthText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <DayInput
        value={inputDay}
        onChangeText={(text) => {
          setInputDay(text);
          validateAndFetchFact(inputMonth, text);
        }}
      />

      {validationError !== "" && (
        <ValidationMessage message={validationError} />
      )}
      {loading && <Loading />}
      {error && <ApiErrorMessage message={error.message} />}
      {dateFact !== "" && <DateFact fact={dateFact} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#FFF3B0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#540B0E",
  },
  dropdown: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#540B0E",
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 10,
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#540B0E",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 5,
    elevation: 5,
  },
  monthItem: {
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  monthText: {
    fontSize: 16,
    color: "#540B0E",
  },
});
