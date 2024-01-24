import React, { useState } from 'react';
import TextField from '../../../TextField/TextField';
import { useTodoContext } from '../../../../hooks/useTodoContext';

const EditTodo = ({ handleEdit, ...data }) => {
	const { editTodo } = useTodoContext();

	const [product, setProduct] = useState({ ...data });
	const [error, setError] = useState({});
	const { id } = data;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setProduct((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (typeof editTodo === 'function') {
			await editTodo(id, product);
			handleEdit();
		} else {
			console.error('editTodo is not a function');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				id="title"
				name="title"
				type="text"
				placeholder="title"
				value={product.title}
				onChange={handleChange}
				error={error.title}
			/>
			<button type="submit">Save</button>
		</form>
	);
};

export default EditTodo;
