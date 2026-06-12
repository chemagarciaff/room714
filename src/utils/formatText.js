function transformMeal(meal) {
  return {
    mealdbId: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: cleanText(meal.strInstructions),
    imageUrl: meal.strMealThumb,
    youtubeUrl: meal.strYoutube,
    tags: meal.strTags || ''
  };
}

function cleanText(text) {
  if (!text) return '';

  return text
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export { transformMeal };