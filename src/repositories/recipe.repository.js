import db from '../config/database.js';

export function saveRecipe(recipe) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO recipes (
      mealdb_id,
      name,
      category,
      area,
      instructions,
      image_url,
      youtube_url,
      tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    recipe.mealdbId,
    recipe.name,
    recipe.category,
    recipe.area,
    recipe.instructions,
    recipe.imageUrl,
    recipe.youtubeUrl,
    recipe.tags
  );

  return findRecipeByMealDbId(recipe.mealdbId);
}

export function findRecipeByMealDbId(mealdbId) {
  const stmt = db.prepare(`
    SELECT * FROM recipes WHERE mealdb_id = ?
  `);

  return stmt.get(mealdbId);
}