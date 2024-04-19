import { StatusBar } from "expo-status-bar";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Tasks from "./components/Tasks";

import { useRef, useState } from "react";

export default function App() {
	const [task, setTask] = useState();
	const [items, setItems] = useState([]);
	const [onEditing, setOnEditing] = useState(false);
	const [editTaskIndex, setTaskIndex] = useState(null);
	const KeyboardFocus = useRef(null);

	const handleAddTasks = () => {
		// console.log(onEditing);
		Keyboard.dismiss();
		setItems([...items, task]);
		setTask(null);
	};

	const handleDelete = (index) => {
		let itemsCopy = [...items];
		itemsCopy.splice(index, 1);
		setItems(itemsCopy);
	};

	const handleEditTask = (index) => {
		setOnEditing(true);
		setTaskIndex(index);
		KeyboardFocus.current.focus();
	};

	const editTasks = (index) => {
		Keyboard.dismiss();
		let itemsCopy = [...items];
		itemsCopy[index] = task;
		setItems(itemsCopy);
		setOnEditing(false);
		setTask(null);
	};

	return (
		<View style={styles.container}>
			<StatusBar />
			<View style={styles.tasksWrapper}>
				<Text style={styles.sectionTitle}>Today's Tasks</Text>
			</View>
			<ScrollView
				style={styles.items}
				keyboardDismissMode="on-drag"
				horizontal={false}
				showsVerticalScrollIndicator={true}>
				{items.map((item, index) => (
					<View key={index}>
						<Tasks text={item} />
						<TouchableOpacity style={styles.deleteButton}>
							<Text onPress={() => handleDelete(index)}>❌</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.editButton}
							onPress={() => handleEditTask(index)}>
							<Text>
								<FontAwesome name="edit" color="blue" size={23} />
							</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.writeTaskWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Write a new task..."
					value={task}
					onChangeText={(text) => setTask(text)}
					ref={KeyboardFocus}
				/>
				<TouchableOpacity
					onPress={
						onEditing === true ? () => editTasks(editTaskIndex) : handleAddTasks
					}>
					<View style={styles.addWrapper}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E8EAED",
	},
	tasksWrapper: {
		paddingTop: 80,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	items: {
		marginTop: 30,
	},
	writeTaskWrapper: {
		position: "absolute",
		bottom: 60,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: "#FFF",
		borderRadius: 60,
		borderColor: "#C0C0C0",
		borderWidth: 1,
		width: 250,
	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: "#FFF",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#C0C0C0",
		borderWidth: 1,
	},
	addText: {
		fontSize: 30,
		paddingBottom: 10,
	},
	deleteButton: {
		position: "absolute",
		top: 16,
		left: "88%",
	},
	editButton: {
		position: "absolute",
		top: 16,
		left: "78%",
	},
});
