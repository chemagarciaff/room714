import path from 'path';
import { initDatabase } from './config/database.js';
import { readRecipeNames } from './utils/fileReader.js';
import { importRecipes } from './services/recipe.service.js';

async function main() {
  try {
    initDatabase();

    const filePath = path.resolve('data/recipes.txt');
    const recipeNames = readRecipeNames(filePath);

    if (recipeNames.length === 0) {
      console.log('El fichero no contiene recetas.');
      return;
    }

    console.log(`Recetas a buscar: ${recipeNames.length}`);

    await importRecipes(recipeNames);

    console.log('Proceso finalizado correctamente.');
  } catch (error) {
    console.error('Ha ocurrido un error:', error.message);
  }
}

main();