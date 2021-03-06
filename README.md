# meli-backend
Test de backend para Mercado Libre.
Alojado en https://meli-backend-test.herokuapp.com/

## Stack tecnológico

* Node.js v14.8.0
* Express v4.17.1
* Mongoose v5.10.0
* Jest + Supertest

## Servidor 
Heroku (https://www.heroku.com/) 

## Comandos

### Instalar dependencias

```
npm install
```
### Copiar las variables de entorno

En el root del proyecto, hacer lo siguiente:

Linux/MacOS:
```
cp .env.local .env
```
Windows:
Copiar el archivo .env.local y renombrar la copia como .env

### Iniciar el servidor

```
node server.js
```
> El servidor se va a ejecutar en el puerto 8000 por defecto. Para ingresar al mismo, ir a http://localhost:8000

### Ejecutar tests

```
npm run test
```
> El comando anterior genera el coverage code en el directorio "test-coverage".

### Instrucciones

#### Comprobar ADN

Enviar una secuencia de ADN mediante un HTTP POST con un JSON a https://meli-backend-test.herokuapp.com/mutant

Ejemplo:
```
curl --location --request POST 'https://meli-backend-test.herokuapp.com/mutant' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ]
}'
```

#### Ver estadísticas

https://meli-backend-test.herokuapp.com/stats

