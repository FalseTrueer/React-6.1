import React from 'react';
import { TodoList } from '../../components';
import styles from './MainPage.module.css';
import PropTypes from 'prop-types';

export const MainPage = ({
	isLoading,
	searchQuery,
	setSearchQuery,
	isSorted,
	setIsSorted,
	todos,
	addTodo,
	newTodo,
	setNewTodo,
	isCreating,
}) => {
	return (
		<>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<>
					<div className={styles.controls}>
						<input
							type="text"
							className={styles.search}
							placeholder="Поиск по задачам..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button
							className={styles.btn}
							onClick={() => setIsSorted(!isSorted)}
						>
							{isSorted ? 'Отключить сортировку' : 'Сортировать A-Z'}
						</button>
					</div>

					<TodoList todos={todos} isPreview={true} />

					<form className={styles.form} onSubmit={addTodo}>
						<input
							type="text"
							className={styles.input}
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							placeholder="Введите задачу"
						/>
						<button
							type="submit"
							className={styles.btn}
							disabled={isCreating}
						>
							{isCreating ? 'Добавление...' : 'Добавить'}
						</button>
					</form>
				</>
			)}
		</>
	);
};

MainPage.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	searchQuery: PropTypes.string.isRequired,
	setSearchQuery: PropTypes.func.isRequired,
	isSorted: PropTypes.bool.isRequired,
	setIsSorted: PropTypes.func.isRequired,
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			title: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
		}),
	).isRequired,
	addTodo: PropTypes.func.isRequired,
	newTodo: PropTypes.string.isRequired,
	setNewTodo: PropTypes.func.isRequired,
	isCreating: PropTypes.bool.isRequired,
};
