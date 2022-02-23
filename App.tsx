import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from './styles';
import { theme } from './colors';

interface ITodo {
  text: string;
  work: boolean;
}

interface ITodos {
  [now: number]: ITodo;
}

export default function App() {
	const [working, setWorking] = useState<boolean>(true);
	const [text, setText] = useState<string>('');
	const [todos, setTodos] = useState<ITodos>({});

	const travel = () => setWorking(false);
	const work = () => setWorking(true);
	const onChangeText = (payload: string) => setText(payload);
	const addTodo = () => {
		if (!text.length) {
			return;
		}

		const newTodos = {
			...todos,
			[Date.now()]: {text, work: working}
		};
		setTodos(newTodos);
		setText('');
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.header}>
				<TouchableOpacity onPress={work}>
					<Text style={{...styles.btnText, color: working ? 'white' : theme.grey}}>Work</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={travel}>
					<Text style={{...styles.btnText, color: working ? theme.grey : 'white'}}>Travel</Text>
				</TouchableOpacity>
			</View>
			<TextInput
				onChangeText={onChangeText}
				style={styles.input}
				placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
				value={text}
				onSubmitEditing={addTodo}
				returnKeyType='done'
			/>
			<ScrollView>
				{Object.keys(todos).map((time) => <View key={time} style={styles.todo}>
					<Text style={styles.todoText}>{todos[+time].text}</Text>
				</View>)}
			</ScrollView>
		</View>
	);
}

