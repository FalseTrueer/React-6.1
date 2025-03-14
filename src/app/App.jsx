import React, { useState } from 'react';
import { useTodos } from '../hooks';
import styles from './App.module.css';
import { MainPage, TodoPage, NotFoundPage } from '../pages';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
	const {
		todos,
		isLoading,
		newTodo,
		setNewTodo,
		isCreating,
		addTodo,
		updateTodo,
		deleteTodo,
		searchQuery,
		setSearchQuery,
		isSorted,
		setIsSorted,
	} = useTodos();
	return (
		<div className={styles.app}>
			<Routes>
				<Route
					path="/"
					element={
						<MainPage
							isLoading={isLoading}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							isSorted={isSorted}
							setIsSorted={setIsSorted}
							todos={todos}
							addTodo={addTodo}
							newTodo={newTodo}
							setNewTodo={setNewTodo}
							isCreating={isCreating}
						/>
					}
				/>
				<Route
					path="/todo/:id"
					element={
						<TodoPage
							isLoading={isLoading}
							todos={todos}
							updateTodo={updateTodo}
							deleteTodo={deleteTodo}
						/>
					}
				/>
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
}

export default App;
