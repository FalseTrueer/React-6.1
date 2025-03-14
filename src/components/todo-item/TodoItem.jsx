import React, { useState } from 'react';
import styles from './TodoItem.module.css';
import PropTypes from 'prop-types';

export function TodoItem({ todo, isPreview }) {
	return (
		<div className={isPreview ? styles.previewText : styles.fullText}>
			{todo.title}
		</div>
	);
}

TodoItem.propTypes = {
	todo: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
	}).isRequired,
	isPreview: PropTypes.bool.isRequired,
};
