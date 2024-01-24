import React from 'react';
import TodosList from './TodosList/TodosList';
import SearchQuery from './SearchQuery/SearchQuery';
import CreateTodo from './CreateTodo/CreateTodo';
import SortTodo from './SortTodo/SortTodo';
import { AppContextProvider } from '../hooks/useTodoContext';
import style from './TodosPages.module.css';

const TodoPage = () => {
	return (
		<div className={style.App}>
			<AppContextProvider>
				<div className={style.header}>
					<h1 className={style.title}>Todo list</h1>
					<hr />
					<div className={style.createTodo}>
						<CreateTodo />
					</div>
					<div className={style.actions}>
						<SearchQuery />
						<SortTodo />
					</div>
				</div>
				<TodosList />
			</AppContextProvider>
		</div>
	);
};
export default TodoPage;
