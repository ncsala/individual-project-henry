import React from 'react'
import RecipeCard from 'components/card/RecipeCard';


function Cards({ currentRecipes }) {
    return (
        <>
            {currentRecipes.map((recipe) => {
                return (
                    <div key={recipe.recipe_id} >
                        <RecipeCard
                            image={recipe.image}
                            recipe_name={recipe.recipe_name}
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