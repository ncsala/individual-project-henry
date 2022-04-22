import React from 'react';

import { Link } from 'react-router-dom';

import PrintsImage from 'components/prints-image/PrintsImage';

import styles from './RecipeCard.module.css'

const Card = ({ recipe_id, image, recipe_name, diets }) => {

    const dietTypes = (diets) ? diets.map((diet) => diet) : null

    return (
        <div className={styles.recipe_card} >
            <PrintsImage image={image} name={recipe_name} />
            <Link to={'/recipes/' + recipe_id} className={styles.link}>
                <h3>{recipe_name}</h3>
            </Link>
            {
                (!diets)
                    ? <p>Dieta no disponible</p>
                    : <p>{dietTypes.join(', ')} </p>
            }
        </div>
    );
};

export default Card;
