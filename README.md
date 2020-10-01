# SPACETHON reto grupal

## Rest api

Esta api esta construida usando nodejs + express.

Esta implementado:

- Registro de usuarios
- Login con jwt
- Consultas para mediciones del satelite
  <br/>
  <br/>

## Rutas

#### **POST** _/api/register_

```javascript
    {
    "email": "<correo>",
    "firstName": "<nombre>",
    "lastName": "<apellido>",
    "institution": "<institucion_a_la_que_pertenece>",
    "password": "<contraseña>"
    }
```

<br/>

#### **POST** _/api/login_

```javascript
    {
    "email": "<correo>",
    "password": "<contraseña>"
    }
```

<br/>

#### **GET** _/api/readings/:type_

El acceso a esa ruta es de tipo privado, por esta razon necesita envial el token de authenticacion en el encabezado.

```
    auth-token: <token>
```

Donde type se reemplaza por el dato que se quiere consultar. En caso que se desee consultar la temperatura, se usaria la siguiente ruta:

```
    /api/readings/temperature
```

<br/>

#### **GET** _/api/readings/:type/:dates_

Esta ruta hace lo mismo que la ruta anterior _/api/readings/:type_ , pero le suma el filtrado por fechas.
Dates de reemplaza por dos fechas introducidas de la siguiente forma:

```
    fechaInicial-fechaFinal
```

Usando el formato YYYY.MM.DD para cada fecha. Un ejemplo es la siguiente ruta:

```
    /api/readings/temperature/2016.09.09-2020.09.09
```
