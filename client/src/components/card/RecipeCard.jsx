import React from 'react';

import { Link } from 'react-router-dom';

import PrintsImage from 'components/prints-image/PrintsImage';

import styles from './RecipeCard.module.css'

const Card = ({ recipe_id, image, recipe_name, score, diets }) => {

    const dietTypes = (diets.length) ? diets.map((diet) => diet) : ['No hay tipo de dieta'];

    return (
        <div className={styles.recipe_card} >
            <PrintsImage image={image} name={recipe_name} />
            <Link to={'/recipes/' + recipe_id} className={styles.link}>
                <h3>{recipe_name}</h3>
            </Link>
            <h4>Puntaje: {score}</h4>
            <p>{dietTypes}</p>
        </div>
    );
};

export default Card;
