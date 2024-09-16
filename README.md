<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Descripción

Prueba técnica donde se implementa un API siguiendo la arquitectura hexagonal, a travez de NestJs v10 sobre Node.Js v20.

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

## Test

```bash
# unit tests
$ npm run test
```

## Documentación

- ### Accounts
  - /api/v1/accounts