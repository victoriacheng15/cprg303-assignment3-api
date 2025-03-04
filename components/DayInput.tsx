import { StyleSheet, TextInput } from "react-native";

export default function DayInput({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Enter Day"
      placeholderTextColor="#999"
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
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
});
