import React from 'react';
import defaultRecipeImg from '../../assets/default-recipe.png'

const Card = ({ image, recipe_name, diets }) => {
    return (
        <>
            <h3>{recipe_name}</h3>

            {
                (!image) ? <img src={defaultRecipeImg} alt='Imagen predeterminada' /> :
                    <img src={image} alt={'Imagen receta de ' + recipe_name} />
            }

            <ul>
                {
                    (!diets) ? <p>No disponible</p> :
                        diets.map((diet, index) => {
                            return <li key={index}>{diet}</li>
                        })
                }
            </ul>
        </>
    );
};

export default Card;
