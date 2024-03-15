# PROYECTO 6 - BACKEND - API REST

Para este proyecto se ha creado una API usando una base de datos con un modelo de películas.
Cada película puede:

## crear la película

- **Método:** POST
- **URL:** `http://localhost:3001/create`

## traerse todas las películas

- **Método:** GET
- **URL:** `http://localhost:3001/movies`

## traerse una película por su id

- **Método:** GET
- **URL:** `http://localhost:3001/id`

## traerse una película por su género o director

- **Método:** GET
- **URL:** `http://localhost:3001/genre/thriller`
- **URL:** `http://localhost:3001/director/polanski`

## actualizar una película por su id

- **Método:** PATCH
- **URL:** `http://localhost:3001/edit/id`

## borrar la película por su id

- **Método:** DELETE
- **URL:** `http://localhost:3001/id`
