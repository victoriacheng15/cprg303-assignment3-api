import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import useFetchDateFact from "../hooks/useFetchDateFact";

export default function Home() {
	const { fetchDateFact, dateFact, loading, error } = useFetchDateFact();
	const [inputMonth, setInputMonth] = useState("");
	const [inputDay, setInputDay] = useState("");

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Welcome to the Date Fact Finder!</Text>
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
});
