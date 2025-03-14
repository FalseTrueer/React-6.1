import React, { useEffect, useState } from 'react';
import { TodoItem } from '../../components';
import styles from './TodoPage.module.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export const TodoPage = ({ isLoading, todos, updateTodo, deleteTodo }) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const todo = todos.find((el) => String(el.id) === id);

	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState('');
	const [isCompleted, setIsCompleted] = useState(false);

	useEffect(() => {
		if (todo) {
			setEditedTitle(todo.title);
			setIsCompleted(todo.completed);
		}
	}, [todo]);

	if (isLoading) {
		return <p>Загрузка...</p>;
	}

	if (!todo && todos.length > 0) {
		return <Navigate to="/404" />;
	}

	function handleEditClick() {
		setIsEditing(true);
	}

	function handleChange(event) {
		setEditedTitle(event.target.value);
	}

	function handleBlur() {
		updateTodo(todo.id, { title: editedTitle });
		setIsEditing(false);
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			handleBlur();
		}
	}

	function toggleComplete() {
		const newCompleted = !isCompleted;
		setIsCompleted(newCompleted);
		updateTodo(todo.id, { completed: newCompleted });
	}

	function handleDelete() {
		deleteTodo(todo.id);
		navigate('/');
	}

	return (
		<>
			<button onClick={() => navigate(-1)} className={styles.backButton}>
				Назад
			</button>
			<div className={styles.todoItem}>
				<div className={styles.itemText}>
					<span className={styles.task}>Задача:</span>
					{isEditing ? (
						<textarea
							type="text"
							value={editedTitle}
							onChange={handleChange}
							onBlur={handleBlur}
							onKeyDown={handleKeyDown}
							autoFocus
							className={styles.input}
							rows={Math.min(editedTitle.split('\n').length, 10)}
						/>
					) : (
						todo && (
							<TodoItem
								className={styles.text}
								todo={todo}
								isPreview={false}
							/>
						)
					)}
				</div>

				<div>
					<button className={styles.svg} onClick={toggleComplete}>
						{isCompleted ? '✔️' : '❌'}
					</button>
					<button className={styles.svg} onClick={handleEditClick}>
						🖉
					</button>
					<button className={styles.svg} onClick={handleDelete}>
						🗑️
					</button>
				</div>
			</div>
		</>
	);
};

TodoPage.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			title: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
		}),
	).isRequired,
	updateTodo: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
};
