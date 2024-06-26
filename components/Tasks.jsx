import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Tasks = ({ text }) => {
	return (
		<View style={styles.item}>
			<View style={styles.itemLeft}>
				<View style={styles.square}></View>
				<Text style={styles.itemText}>{text}</Text>
			</View>
		</View>
	);
};

export default Tasks;

const styles = StyleSheet.create({
	item: {
		backgroundColor: "#FFF",
		padding: 15,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
		marginHorizontal: 10,
		
	},
	itemLeft: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	square: {
		width: 24,
		height: 24,
		backgroundColor: "#55BCF6",
		opacity: 0.4,
		borderRadius: 5,
		marginRight: 15,
	},
	itemText: {
		maxWidth: "80%",
	},
});
