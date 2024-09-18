<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Descripción

Este proyecto es una prueba técnica que implementa una API utilizando NestJS v10 sobre Node.js v20. Se ha seguido la arquitectura hexagonal y los principios SOLID.

## Arquitectura

El proyecto está estructurado en cuatro capas principales:

1. **Capa de Dominio**: Define las entidades del dominio, enums y repositorios.
2. **Capa de Aplicación**: Contiene los casos de uso representados por los servicios de NestJS.
3. **Capa de Infraestructura**: Configura la base de datos MongoDB y el ORM Mongoose, e implementa los repositorios.
4. **Capa de Adaptadores**: Define los controladores, módulos y DTOs que actúan como punto de entrada al sistema.

## Patrones de Diseño

- **Inyección de Dependencias**: Utilizado para lograr inversión de control entre las clases y sus dependencias.
- **Repositorio**: Implementado entre la capa de Dominio e Infraestructura.
- **Data Transfer Object (DTO)**: Usado en la capa de adaptadores para validar datos de entrada.
- **Otros**: Module, Singleton y Factory, implementados por NestJS.

## Instalación

```bash
$ git clone git@github.com:ChLesmes/subs_well.git
$ cd subs_well/
$ npm install
```

## Configuración Inicial

1. Clonar el archivo de variables de entorno:
   ```bash
   cp .env.template .env
   ```

2. Iniciar una instancia de MongoDB en Docker:
   ```bash
   docker-compose -f mongodb/docker-compose.yaml up -d --build
   ```

## Ejecución

```bash
# Desarrollo
$ npm run start:dev

# Producción
$ npm run start:prod
```
La API estará disponible en `/api/v1` (por defecto en http://localhost:3000/api/v1/)


## Pruebas

```bash
# Pruebas unitarias
$ npm run test
```

## Documentación

La documentación de la API está generada con Swagger y disponible en `/api` (por defecto en http://localhost:3000/api)

## Tecnologías Principales

- NestJS v10
- Node.js v20
- MongoDB
- Mongoose

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o realiza un pull request para sugerir cambios o mejoras.

## Licencia

[MIT](LICENSE)