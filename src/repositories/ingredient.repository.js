import db from '../config/database.js';

export function saveIngredient(name) {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO ingredients (name)
    VALUES (?)
  `);

  insert.run(name);

  return findIngredientByName(name);
}

export function findIngredientByName(name) {
  const stmt = db.prepare(`
    SELECT * FROM ingredients WHERE name = ?
  `);

  return stmt.get(name);
}