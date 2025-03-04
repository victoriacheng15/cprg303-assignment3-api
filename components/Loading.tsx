import { StyleSheet, ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
  );
}
const styles = StyleSheet.create({
  loading: {
    color: "#540B0E",
    fontSize: 16,
    marginTop: 10,
  },
});
