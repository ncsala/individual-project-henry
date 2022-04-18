import React from 'react';
import defaultRecipeImg from '../../assets/cooking.png'

import styles from './RecipeCard.module.css'

const Card = ({ image, recipe_name, diets }) => {

    const dietTypes = (diets) ? diets.map((diet) => diet) : null

    return (
        <div className={styles.recipe_card} >
            <div className={styles.img_container}>
            {
                (!image) 
                    ? (<img src={defaultRecipeImg} alt='Imagen predeterminada' className={styles.img} />) 
                    : (<img src={image} alt={'Imagen receta de ' + recipe_name} className={styles.img}/>)
            }
            </div>

            <h3>{recipe_name}</h3>
            {
                (!diets) 
                    ? <p>Dieta no disponible</p> 
                    : <p>{dietTypes.join(', ')} </p>
            }
        </div>
    );
};

export default Card;
