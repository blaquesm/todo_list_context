import React, { useState, useEffect, createContext, useContext } from 'react';
import style from './useTodoContext.module.css';

const AppContext = createContext({});

export const useTodoContext = () => {
	return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
	const [todo, setTodo] = useState([]);
	const [isLoadin, setIsLoadin] = useState(false);
	const [sortTodos, setSortTodos] = useState(false);

	const loadTodos = async () => {
		setIsLoadin(true);
		try {
			const response = await fetch(`http://localhost:3005/posts`);
			const data = await response.json();
			const sortedData = sortTodos
				? data.slice().sort((a, b) => a.title.localeCompare(b.title))
				: data;
			setTodo(sortedData);
		} catch (error) {}
		setIsLoadin(false);
	};
	const createTodo = async (newTodo) => {
		try {
			const response = await fetch('http://localhost:3005/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTodo),
			});

			const createdTodo = await response.json();
			setTodo((prevTodo) => [...prevTodo, createdTodo]);
		} catch (error) {
			console.error(error);
		}
	};

	const editTodo = async (id, payload) => {
		try {
			const response = await fetch(`http://localhost:3005/posts/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...payload }),
			});

			const todoIndex = todo.findIndex((prod) => prod.id === id);
			const updateTodo = await response.json();
			const copyData = todo.slice();
			copyData[todoIndex] = updateTodo;
			setTodo(copyData);
		} catch (error) {}
	};

	const deleteTodo = async (id) => {
		try {
			await fetch(`http://localhost:3005/posts/${id}`, {
				method: 'DELETE',
			});
			setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error('Error deleting todo:', error);
		}
	};
	const getTodoById = (id) => {
		return todo.find((prod) => prod.id === Number(id));
	};

	useEffect(() => {
		setIsLoadin(true);
		loadTodos();
	}, [sortTodos, setTodo]);

	return (
		<AppContext.Provider
			value={{
				todo,
				getTodoById,
				createTodo,
				deleteTodo,
				editTodo,
				setIsLoadin,
				loadTodos,
				setTodo,
				sortTodos,
				setSortTodos,
			}}
		>
			{isLoadin ? <div className={style.loader} /> : children}
		</AppContext.Provider>
	);
};
