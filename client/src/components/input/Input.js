import React from 'react';
import styles from './Input.module.css';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getDiets } from 'redux/actions/actions.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function Input({htmlFor, label, id, type, name, value, onChange, error, placeholder, minLength, maxLength }) {

	return (
		<div>
			<label
				className={styles.formulario__campo__label}
				htmlFor={htmlFor}
			>
				{label}
			</label>
			<input
				id={id}
				// onChange={handleChange}
				type={type}
				name={name}
				value={value}
				className={styles.formulario__campo__inputTexto}
				placeholder='Ingrese nombre de la receta'
				minLength={minLength}
				maxLength={maxLength}
			/>
			{/* {errors.recipe_name && (
					<span className={styles.leyenda}>{errors.recipe_name}</span>
				)} */}
		</div>
	);
}

export default Input;
