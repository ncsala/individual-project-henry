import React from 'react';
import defaultRecipeImg from '../../assets/cooking.png'

const Card = ({ image, recipe_name, diets }) => {

    const dietTypes = (diets) ? diets.map((diet) => diet) : null

    return (
        <>
            {
                (!image) ? <img src={defaultRecipeImg} alt='Imagen predeterminada' /> :
                    <img src={image} alt={'Imagen receta de ' + recipe_name} />
            }
            <h3>{recipe_name}</h3>

            {
                (!diets) ? <p>Dieta no disponible</p> :
                    <p>{dietTypes.join(', ')} </p>
            }
        </>
    );
};

export default Card;
