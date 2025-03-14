import React from 'react';
import styles from './TodoList.module.css';
import PropTypes from 'prop-types';
import { TodoItem } from '../';
import { Link, Outlet } from 'react-router-dom';

export function TodoList({ todos, isPreview }) {
	return (
		<>
			<ul className={styles.todoList}>
				{todos.length === 0 ? (
					<p className={styles.empty}>Задач не найдено</p>
				) : (
					todos.map((todo) => (
						<li className={styles.todoItem} key={todo.id}>
							<Link to={`/todo/${todo.id}`} className={styles.link}>
								<TodoItem todo={todo} isPreview={isPreview} />
							</Link>
						</li>
					))
				)}
			</ul>
			<Outlet />
		</>
	);
}

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			title: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
		}),
	).isRequired,
	isPreview: PropTypes.bool.isRequired,
};
