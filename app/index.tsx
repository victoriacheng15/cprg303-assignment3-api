import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet, 
} from "react-native";
import useFetchDateFact from "../hooks/useFetchDateFact";

export default function Home() {
    const { fetchDateFact, dateFact, loading, error } = useFetchDateFact();
    const [inputMonth, setInputMonth] = useState("");
    const [inputDay, setInputDay] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [validationError, setValidationError] = useState("");

    const months = [
        { label: "January", value: "1", days: 31 },
        { label: "February", value: "2", days: 29 }, 
        { label: "March", value: "3", days: 31 },
        { label: "April", value: "4", days: 30 },
        { label: "May", value: "5", days: 31 },
        { label: "June", value: "6", days: 30 },
        { label: "July", value: "7", days: 31 },
        { label: "August", value: "8", days: 31 },
        { label: "September", value: "9", days: 30 },
        { label: "October", value: "10", days: 31 },
        { label: "November", value: "11", days: 30 },
        { label: "December", value: "12", days: 31 },
    ];

    const selectMonth = (month: string) => {
        setInputMonth(month);
        setModalVisible(false);
        setValidationError("");
        validateAndFetchFact(month, inputDay);
    };

    const handleDayChange = (day: string) => {
        setInputDay(day);
        validateAndFetchFact(inputMonth, day);
    };

    const validateAndFetchFact = (month: string, day: string) => {
        if (!month || !day) {
            setValidationError("");
            return;
        }

        const selectedMonth = months.find(m => m.value === month);
        if (!selectedMonth) return;

        const dayNum = parseInt(day, 10);
        if (isNaN(dayNum) || dayNum < 1 || dayNum > selectedMonth.days) {
            setValidationError("Please enter a valid day from (1-31) or (1-29) if it's February.");
            return;
        }

        setValidationError("");
        fetchDateFact(month, day);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome to the Date Fact Finder!</Text>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                    {inputMonth ? months.find(m => m.value === inputMonth)?.label : "Select a Month"}
                </Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="fade" transparent>
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={months}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.monthItem} onPress={() => selectMonth(item.value)}>
                                    <Text style={styles.monthText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            <TextInput
                style={styles.input}
                placeholder="Enter Day"
                keyboardType="numeric"
                value={inputDay}
                onChangeText={handleDayChange}
            />

            {validationError !== "" && <Text style={styles.errorText}>{validationError}</Text>}
            {loading && <Text style={styles.loading}>Loading...</Text>}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
            {dateFact !== "" && <Text style={styles.fact}>{dateFact}</Text>}
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
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#540B0E",
        borderRadius: 5,
        textAlign: "center",
        backgroundColor: "white",
        marginVertical: 10,
        color: "#540B0E",
    },
    loading: {
        color: "#540B0E",
        fontSize: 16,
        marginTop: 10,
    },
    errorText: {
        color: "red",
        marginTop: 10,
        textAlign: "center",
    },
    fact: {
        marginTop: 20,
        fontSize: 16,
        color: "#540B0E",
        fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: 10,
    },
});



















































