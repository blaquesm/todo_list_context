import style from './SortTodo.module.css';
import { useTodoContext } from '../../hooks/useTodoContext';

const SortTodo = () => {
	const { sortTodos, setSortTodos } = useTodoContext();
	return (
		<>
			<button
				className={sortTodos ? style.sortButtonOff : style.sortButtonOn}
				onClick={() => setSortTodos(!sortTodos)}
			>
				{sortTodos ? 'Sort off' : 'Sort on'}
			</button>
		</>
	);
};
export default SortTodo;
