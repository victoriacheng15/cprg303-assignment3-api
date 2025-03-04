import { StyleSheet, Text } from "react-native";

export default function DateFact({ fact }: { fact: string }) {
  return <Text style={styles.fact}>{fact}</Text>;
}

const styles = StyleSheet.create({
  fact: {
    marginTop: 20,
    fontSize: 16,
    color: "#540B0E",
    fontWeight: "bold",
    textAlign: "center",
  },
});
