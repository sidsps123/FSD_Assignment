import React from "react";
import RecipeItem from "./RecipeItem";

const Recipes = props => {
  const { recipes } = props;
  if(recipes===[]){
    return(
      <div>Data is Not Available</div>
    )
  }
  return (
    <div class="card-columns">
      {recipes.map(recipe => (
        <RecipeItem
          key={Math.random() * 100}
          name={recipe.food_name}
          image={recipe.image}
        />
      ))}
    </div>
  );
};

export default Recipes;
