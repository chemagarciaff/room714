import fs from 'fs';

export function readRecipeNames(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}