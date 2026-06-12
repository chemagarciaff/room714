# Uso de IA durante la prueba técnica

Durante el desarrollo de esta prueba he utilizado IA como herramienta de apoyo para la planificación inicial del proyecto y para la generación de documentación. No he utilizado IA para generar automáticamente la solución completa ni para tomar decisiones técnicas sin revisión.

## Flujo de trabajo

1. Analicé los requisitos de la prueba y decidí utilizar Node.js junto con SQLite.
2. Utilicé IA para obtener una propuesta de estructura de proyecto basada en buenas prácticas de separación de responsabilidades.
3. Implementé la solución adaptando dicha estructura a los requisitos concretos del ejercicio.
4. Una vez finalizada la implementación, utilicé IA para generar un primer borrador del README.
5. Revisé y adapté manualmente toda la documentación para que reflejase fielmente la solución entregada.

## Prompts utilizados

### Prompt 1: Diseño de la estructura del proyecto

```text
Estoy preparando una prueba técnica backend para un puesto junior.

Quiero implementar una solución en Node.js con SQLite. El programa debe leer nombres de recetas desde `data/recipes.txt`, consultar TheMealDB, transformar los datos y guardarlos en base de datos.

Propón una estructura de proyecto basada en esta separación de responsabilidades:

* configuración de base de datos
* servicios para llamadas externas y lógica de negocio
* repositorios para acceso a datos
* utilidades para lectura de ficheros y extracción/normalización de ingredientes
* script SQL de esquema
* punto de entrada principal

Devuélveme:

1. El árbol de carpetas y archivos.
2. Una explicación breve de cada archivo.
3. Por qué esta estructura es adecuada para una prueba técnica de 2-3 horas.
4. Qué partes conviene mantener simples para no sobreingenierizar.
```

### Prompt 2: Generación del README

```text
Actúa como un desarrollador backend senior revisando una prueba técnica para un puesto junior.

Voy a proporcionarte la estructura del proyecto, el stack tecnológico utilizado y el modelo de datos. A partir de esa información, genera un README profesional, claro y conciso, apropiado para una entrega de prueba técnica.

El README debe incluir únicamente:

# Descripción del proyecto

Explicación breve del objetivo de la aplicación y del flujo general de funcionamiento.

# Stack tecnológico

Justificación breve de las tecnologías elegidas y por qué son adecuadas para este ejercicio.

# Estructura del proyecto

Descripción de las carpetas y archivos principales, explicando sus responsabilidades.

# Modelo de datos

Descripción de las tablas, relaciones y decisiones de diseño relevantes.

# Ejecución del proyecto

Pasos necesarios para instalar dependencias, inicializar la base de datos y ejecutar la aplicación.

# Decisiones técnicas

Explicación breve de las decisiones más importantes tomadas durante la implementación y los compromisos realizados para mantener la solución simple.

# Posibles mejoras

Lista de mejoras que implementarías con más tiempo, diferenciando entre mejoras funcionales, de calidad de datos y de arquitectura.

Requisitos de redacción:
```

## Trabajo delegado a la IA

* Propuesta inicial de estructura del proyecto.
* Sugerencias de organización de carpetas y responsabilidades.
* Generación de un primer borrador del README.

## Trabajo realizado por mí

* Análisis de requisitos.
* Selección del stack tecnológico.
* Diseño final de la arquitectura y modelo de datos.
* Implementación de la lógica de negocio.
* Integración con la API de TheMealDB.
* Transformación y normalización de datos.
* Persistencia en SQLite.
* Pruebas y validación de la solución.
* Revisión y adaptación de toda la documentación generada.

La IA se utilizó como herramienta de apoyo para acelerar tareas de organización y documentación, manteniendo el control sobre las decisiones técnicas y la implementación final.
