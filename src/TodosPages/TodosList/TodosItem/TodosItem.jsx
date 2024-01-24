import React, { useState, useEffect } from 'react';
import style from './TodosItem.module.css';
import EditTodo from './EditTodo/EditTodo';
import DeleteConfirmation from './DeleteConfirmation/DeleteConfirmation';
import { useTodoContext } from '../../../hooks/useTodoContext';

const TodoItem = ({ ...data }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const { deleteTodo } = useTodoContext();

	const handleEdit = () => {
		setIsEdit((prevState) => !prevState);
	};

	const handleCheckboxChange = () => {
		setIsDone((prevState) => !prevState);
	};

	const handleDeleteClick = () => {
		setShowDeleteConfirmation(true);
	};

	const handleDeleteCancel = () => {
		setShowDeleteConfirmation(false);
	};

	const handleDeleteConfirm = () => {
		deleteTodo(data.id);
		setShowDeleteConfirmation(false);
	};

	useEffect(() => {
		if (data && data.length) {
			setIsDone(new Array(data.length).fill(false));
			console.log(data);
		}
	}, []);

	return (
		<>
			{isEdit ? (
				<EditTodo {...data} handleEdit={handleEdit} />
			) : (
				<li className={style.li}>
					<span className={isDone ? style.done : ''}>
						<input
							type="checkbox"
							checked={isDone}
							onChange={handleCheckboxChange}
						/>
						{data.title}
					</span>
					<button className={style.buttonEdit} onClick={handleEdit}>
						Edit
					</button>
					<button className={style.rm} onClick={handleDeleteClick}>
						&times;
					</button>
					{showDeleteConfirmation && (
						<DeleteConfirmation
							onCancel={handleDeleteCancel}
							onConfirm={handleDeleteConfirm}
						/>
					)}
				</li>
			)}
		</>
	);
};
export default TodoItem;
