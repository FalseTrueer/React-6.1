import React from 'react';
import styles from './NotFoundPage.module.css';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<button
			className={styles.nfPage}
			onClick={() => {
				navigate('/');
			}}
		>
			<p>Ошибка 404</p>
			Вернуться на главную страницу
		</button>
	);
};
