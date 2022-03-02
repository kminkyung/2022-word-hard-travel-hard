import React, {useEffect} from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { theme } from './colors';

interface ITodo {
  text: string;
  working: boolean;
}

interface ITodos {
  [now: number]: ITodo;
}

const STORAGE_KEY = '@todos';

export default function App() {
	const [working, setWorking] = useState<boolean>(true);
	const [text, setText] = useState<string>('');
	const [todos, setTodos] = useState<ITodos>({});

	const travel = () => setWorking(false);
	const work = () => setWorking(true);
	const onChangeText = (payload: string) => setText(payload);
	const saveTodos = async (toSave: ITodos) => {
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
		} catch (e) {
			console.error(e);
		}
	};

	const loadTodos = async () => {
		const todos = await AsyncStorage.getItem(STORAGE_KEY);
		console.log('todos', todos);
		if (todos) {
			setTodos(JSON.parse(todos));
		}
	};

	const addTodo = async () => {
		if (!text.length) {
			return;
		}

		const newTodos = {
			...todos,
			[Date.now()]: {text, working}
		};
		setTodos(newTodos);
		await saveTodos(newTodos);
		setText('');
	};

	useEffect(() => {
		loadTodos();
	}, []);

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
				{Object.keys(todos).map((key) =>
					todos[+key].working === working ? (
						<View key={key} style={styles.todo}>
							<Text style={styles.todoText}>{todos[+key].text}</Text>
						</View>
					) : null
				)}
			</ScrollView>
		</View>
	);
}

