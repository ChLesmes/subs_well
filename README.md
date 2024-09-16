<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Descripción

Prueba técnica donde se implementa un API siguiendo la arquitectura hexagonal y los principios SOLID, a travez de NestJs v10 sobre Node.Js v20.

## Arquitectura

- ### Capa de dominio
  Se definen las entidades del dominio, los enums y repositorios. 

- ### Capa de aplicación
  Se definen los casos de uso representados con los servicios de NestJs. 

- ### Capa de infraestructura
  Se definen y configura la base de datos ***Mongo*** y el ORM ***Mongoose***, tambien se implementan los repositorios. 

- ### Capa de adaptadores
  Se definen los controladores, modulos y dtos que serán la puerta de entrada del sistema. 

## Patrones de diseño

- ### Inyección de Dependencias:
  Es un patrón que incorpora NestJs y usa a lo largo de la aplicación logrando una invesión del control entre clases y sus dependencias.

- ### Repositorio:
  Este patrón se usa como base en la arquitectura hexagonal para proteger el dominio, está implementado claramente entre la capa del Dominio y la infraestructura.

- ### Data Transfer Object: 
  Se usa para capturar y validar los datos de entrada a travez del API, usado en la capa de adaptadores.

Ademas de estos, tambien tenemos otros patrones de diseño que nos obliga a implementar ***NestJS*** como Module, Singleton o Factory.

## Instalación

```bash
$ git clone git@github.com:ChLesmes/subs_well.git
$ cd subs_well/
$ npm install
```

## Primeros Pasos

Clonar la plantilla de las variables de entorno
```bash
$ cp .env.template .env
```

Ejecutar en un contenedor una instancia de mongo
```bash
$ docker-compose -f mongodb/docker-compose.yaml up -d --build
```

## Correr la App

```bash
# Desarrollo
$ npm run start:dev

# Producción
$ npm run start:prod
```
El api estará disponiblé en ```/api/v1``` (por defecto en **http://localhost:3000/api/v1/**)


<!-- ## Test

```bash
# unit tests
$ npm run test
``` -->

## Documentación

La documentación del API está creada con Swagger y disponible en ```/api``` (por defecto **http://localhost:3000/api**)