import { Slot } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function Layout() {
	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerText}>Get Date Fact</Text>
			</View>

			{/* Main Content */}
			<View style={styles.content}>
				<Slot />
			</View>

			{/* Footer */}
			<View style={styles.footer}>
				<Text style={styles.footerText}>
					CPRG-303-B: Assignment 3 - API Calls and Lists
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#540B0E",
	},
	header: {
		padding: 20,
		backgroundColor: "#540B0E",
		alignItems: "center",
	},
	headerText: {
		color: "#FFF3B0",
		fontSize: 18,
		fontWeight: "bold",
	},
	content: {
		flex: 1,
		backgroundColor: "#540B0E",
	},
	footer: {
		padding: 14,
		backgroundColor: "#540B0E",
		alignItems: "center",
	},
	footerText: {
		color: "#FFF3B0",
		fontSize: 14,
	},
});
