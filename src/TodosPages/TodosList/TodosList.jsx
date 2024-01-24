import React from 'react';
import style from './TodosList.module.css';
import TodoItem from './TodosItem/TodosItem';
import { useTodoContext } from '../../hooks/useTodoContext';
const TodosList = () => {
	const { todo } = useTodoContext();
	return (
		<ul className={style.Ul}>
			{todo.length === 0 ? (
				<p className={style.noNotes}>Todo List is empty </p>
			) : (
				todo.map((data) => <TodoItem key={data.id} {...data} />)
			)}
		</ul>
	);
};
export default TodosList;
