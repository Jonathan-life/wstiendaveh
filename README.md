## APIret - API REST con Express y MySQL

Esta es una API REST para gestionar vehículos en una tienda ficticia llamada `tiendaveh`. Utiliza **Node.js**, **Express** y **MySQL** como base de datos.

---

##  Tabla: `vehiculos`

Antes de iniciar el servidor, asegúrate de tener la base de datos creada con la siguiente estructura:

```sql
CREATE DATABASE tiendaveh;
USE tiendaveh;

CREATE TABLE vehiculos (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  marca   VARCHAR(30) NOT NULL,
  modelo  VARCHAR(30) NOT NULL,
  color   VARCHAR(30) NOT NULL,
  precio  DECIMAL(9,2) NOT NULL,
  placa   CHAR(7) NOT NULL,
  CONSTRAINT uk_placa_veh UNIQUE (placa)
) ENGINE = InnoDB;


##Módulos requeridos

Instala las dependencias con:

```npm install express mysql dotenv nodemon
