import React from 'react';
import defaultRecipeImg from '../../assets/default-recipe.png'

const Card = ({ image, recipe_name, diets }) => {

    const dietTypes = (diets) ? diets.map((diet) => diet) : null

    return (
        <>
            <h3>{recipe_name}</h3>

            {
                (!image) ? <img src={defaultRecipeImg} alt='Imagen predeterminada' /> :
                    <img src={image} alt={'Imagen receta de ' + recipe_name} />
            }

            <ul>
                {
                    (!diets) ? <p>Dieta no disponible</p> :
                        dietTypes.join(', ')
                }
            </ul>
        </>
    );
};

export default Card;
