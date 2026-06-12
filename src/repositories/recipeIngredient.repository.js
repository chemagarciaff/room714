import db from '../config/database.js';

export function saveRecipeIngredient(recipeId, ingredientId, measure) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO recipe_ingredients (
      recipe_id,
      ingredient_id,
      measure
    ) VALUES (?, ?, ?)
  `);

  stmt.run(recipeId, ingredientId, measure);
}