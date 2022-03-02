import React, {useEffect} from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { theme } from './colors';

interface ITodo {
  text: string;
  working: boolean;
}

interface ITodos {
  [now: string]: ITodo;
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
		try {
			const todos = await AsyncStorage.getItem(STORAGE_KEY);
			if (todos) {
				setTodos(JSON.parse(todos));
			}
		} catch (e) {
			console.error(e);
		}
	};

	const deleteTodo = (key: keyof ITodos) => {
		Alert.alert('Delete To Do', 'Are you sure?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'I\'m sure',
				style: 'destructive',
				onPress: async () => {
					const newTodos = { ...todos };
					delete newTodos[key];
					await saveTodos(newTodos);
					setTodos(newTodos);
				},
			},
		]);
	};

	const addTodo = async () => {
		if (!text.length) {
			return;
		}

		const newTodos = {
			...todos,
			[String(Date.now())]: {text, working}
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
					todos[key].working === working ? (
						<View key={key} style={styles.todo}>
							<Text style={styles.todoText}>{todos[key].text}</Text>
							<TouchableOpacity onPress={() => deleteTodo(key)}>
								<AntDesign name='closecircle' size={20} color={theme.grey} />
							</TouchableOpacity>
						</View>
					) : null
				)}
			</ScrollView>
		</View>
	);
}

