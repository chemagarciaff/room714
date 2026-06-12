const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export async function searchMealsByName(name) {
  const url = `${API_URL}${encodeURIComponent(name)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error llamando a TheMealDB: ${response.status}`);
  }

  const data = await response.json();

  return data.meals || [];
}