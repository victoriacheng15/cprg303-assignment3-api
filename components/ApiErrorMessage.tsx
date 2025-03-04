import { StyleSheet, Text } from "react-native";

export default function ApiErrorMessage({ message }: { message: string }) {
  return <Text style={styles.errorText}>{message}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
