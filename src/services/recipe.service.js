import { searchMealsByName } from './mealdb.service.js';
import { extractIngredients } from '../utils/ingredientExtractor.js';
import { transformMeal } from '../utils/formatText.js';
import { saveRecipe } from '../repositories/recipe.repository.js';
import { saveIngredient } from '../repositories/ingredient.repository.js';
import { saveRecipeIngredient } from '../repositories/recipeIngredient.repository.js';

export async function importRecipes(recipeNames) {
  for (const recipeName of recipeNames) {
    console.log(`Buscando recetas para: ${recipeName}`);

    const meals = await searchMealsByName(recipeName);

    if (meals.length === 0) {
      console.log(`No se encontraron recetas para: ${recipeName}`);
      continue;
    }

    
    for (const meal of meals) {
      const recipe = transformMeal(meal);
      const savedRecipe = saveRecipe(recipe);

      const ingredients = extractIngredients(meal);

      for (const item of ingredients) {
        const savedIngredient = saveIngredient(item.name);

        saveRecipeIngredient(
          savedRecipe.id,
          savedIngredient.id,
          item.measure
        );
      }

      console.log(`Receta guardada: ${recipe.name}`);
    }
  }
}

