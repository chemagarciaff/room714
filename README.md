# Descripción del proyecto

Aplicación Node.js que procesa un listado de nombres de recetas desde un fichero de entrada, consulta la API pública de TheMealDB para obtener información detallada de cada receta y almacena los resultados en una base de datos SQLite normalizada.

El flujo general es el siguiente:

1. Se inicializa la base de datos y se crea el esquema si no existe.
2. Se leen los nombres de recetas desde `data/recipes.txt`.
3. Para cada receta se realiza una búsqueda en TheMealDB.
4. Se transforma y normaliza la información recibida.
5. Se almacenan las recetas, ingredientes y sus relaciones en una base de datos relacional.
6. Se evita la duplicidad mediante restricciones de unicidad en las tablas correspondientes.

El objetivo es disponer de una estructura de datos preparada para futuras funcionalidades relacionadas con búsquedas, recomendaciones o análisis basados en ingredientes.

# Stack tecnológico

### Node.js

Se ha utilizado Node.js por ser una solución ligera y suficiente para un proceso ETL sencillo basado en lectura de ficheros, consumo de APIs externas y persistencia de datos.

### SQLite

SQLite permite disponer de una base de datos relacional sin necesidad de configurar servicios adicionales, lo que simplifica la ejecución y evaluación de la prueba técnica.

### better-sqlite3

Librería de acceso a SQLite con una API simple y buen rendimiento para aplicaciones pequeñas o scripts de procesamiento de datos.

### TheMealDB API

Fuente de datos externa utilizada para obtener información detallada de las recetas a partir de su nombre.

# Estructura del proyecto

```text
Room714/
│
├── data/
│   └── recipes.txt
│
├── database/
│   └── recipes.db
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── db/
│   │   └── schema.sql
│   │
│   ├── repositories/
│   │   ├── recipe.repository.js
│   │   ├── ingredient.repository.js
│   │   └── recipeIngredient.repository.js
│   │
│   ├── services/
│   │   ├── mealdb.service.js
│   │   └── recipe.service.js
│   │
│   ├── utils/
│   │   ├── fileReader.js
│   │   ├── ingredientExtractor.js
│   │   └── formatText.js
│   │
│   └── index.js
│
├── package.json
└── .env
```

### `src/index.js`

Punto de entrada de la aplicación. Coordina la inicialización de la base de datos, la lectura del fichero y la ejecución del proceso de importación.

### `src/config`

Contiene la configuración e inicialización de la conexión con SQLite.

### `src/db`

Incluye el esquema SQL utilizado para crear las tablas necesarias.

### `src/services`

Implementa la lógica de negocio:

* Consulta a TheMealDB.
* Procesamiento de recetas.
* Coordinación del flujo de importación.

### `src/repositories`

Capa responsable de la persistencia y acceso a datos.

Cada repositorio encapsula las operaciones relacionadas con una entidad concreta.

### `src/utils`

Funciones auxiliares para:

* Lectura de ficheros.
* Extracción de ingredientes.
* Transformación y normalización de datos.

### `data`

Contiene el fichero de entrada con los nombres de recetas a procesar.

### `database`

Ubicación de la base de datos SQLite generada por la aplicación.

# Modelo de datos

La información se almacena utilizando un modelo relacional normalizado.

## Tabla `recipes`

Almacena la información principal de cada receta.

Campos relevantes:

* `mealdb_id`
* `name`
* `category`
* `area`
* `instructions`
* `image_url`
* `youtube_url`
* `tags`

Se utiliza `mealdb_id` como identificador único procedente de la API externa.

## Tabla `ingredients`

Catálogo único de ingredientes.

Campos:

* `id`
* `name`

Se impone una restricción `UNIQUE` sobre el nombre para evitar duplicados.

## Tabla `recipe_ingredients`

Tabla intermedia que modela la relación muchos-a-muchos entre recetas e ingredientes.

Campos:

* `recipe_id`
* `ingredient_id`
* `measure`

Permite almacenar la cantidad o medida asociada a cada ingrediente dentro de una receta concreta.

## Relaciones

```text
recipes
   |
   | 1:N
   |
recipe_ingredients
   |
   | N:1
   |
ingredients
```

Esta estructura evita duplicidades y facilita futuras consultas por ingrediente o receta.

# Ejecución del proyecto

## Requisitos

* Node.js 18 o superior
* npm

## Instalación

```bash
npm install
```

## Configuración

Crear un fichero `.env` si se requieren variables de entorno adicionales.

## Preparar datos de entrada

Añadir las recetas a procesar en:

```text
data/recipes.txt
```

Una receta por línea.

## Ejecutar la aplicación

```bash
npm start
```

Durante la ejecución se:

1. Inicializa la base de datos.
2. Crea las tablas si no existen.
3. Consulta TheMealDB.
4. Almacena los datos procesados en SQLite.

La base de datos resultante se genera en:

```text
database/recipes.db
```

# Decisiones técnicas

### Arquitectura por capas

Se ha separado la lógica en servicios, repositorios y utilidades para mantener responsabilidades claras sin introducir complejidad innecesaria.

### SQLite como almacenamiento

Para una prueba técnica de alcance reducido resulta suficiente y elimina dependencias externas.

### Modelo normalizado

Los ingredientes se almacenan de forma independiente y se relacionan mediante una tabla intermedia para evitar redundancia de datos.

### Procesamiento secuencial

Las recetas se procesan secuencialmente para mantener una implementación sencilla y fácil de seguir. Dado el volumen esperado de datos, el impacto en rendimiento es reducido.

### Ausencia de framework

Se ha optado por una solución basada únicamente en Node.js y librerías mínimas para centrar el ejercicio en la lógica de negocio y el modelado de datos.

# Posibles mejoras

## Funcionales

* Soporte para actualización incremental de recetas.
* Filtros de búsqueda por ingredientes, categoría o país.
* Exportación de resultados a formatos CSV o JSON.
* Generación de recomendaciones basadas en ingredientes compartidos.

## Calidad de datos

* Normalización más avanzada de ingredientes y medidas.
* Gestión de sinónimos y variantes de nombres.
* Validación más estricta de datos recibidos desde la API.
* Registro de recetas no encontradas para revisión posterior.

## Arquitectura

* Incorporar tests unitarios e integración.
* Añadir sistema de logging estructurado.
* Implementar configuración centralizada.
* Sustituir SQLite por PostgreSQL para escenarios de mayor volumen.
* Procesamiento concurrente controlado para mejorar rendimiento.
* Incorporar un ORM o query builder si el dominio creciera en complejidad.
