import React from 'react'

import RecipeCard from 'components/card/RecipeCard';

function Cards({ currentRecipes }) {
    return (
        <>
            {currentRecipes.map((recipe) => {
                return (
                    <div key={recipe.recipe_id} >
                        <RecipeCard
                            recipe_id={recipe.recipe_id}
                            image={recipe.image}
                            recipe_name={recipe.recipe_name}
                            score={recipe.score}
                            diets={recipe.diets}
                        />
                    </div>
                );
            })
            }
        </>
    )
}

export default Cards