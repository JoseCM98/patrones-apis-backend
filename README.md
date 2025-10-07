## 📋 Descripción

Este proyecto es una aplicación backend construida con **Node.js** y **Express.js**.  
Su objetivo es proveer una API RESTful escalable, modular y fácil de mantener.  
Puede servir como base para proyectos de microservicios, integraciones con bases de datos o aplicaciones web completas.

---

## 🧩 Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución de JavaScript en el servidor  
- **Express.js** – Framework para crear aplicaciones web y APIs  
- **MongoDB / Mongoose** *(opcional)* – Base de datos NoSQL  
- **Cors & Morgan** – Middleware para seguridad y logs  
- **Dotenv** – Manejo de variables de entorno  
- **Nodemon** – Reinicio automático durante el desarrollo  

---

## 📁 Estructura del Proyecto
backend/
├── controllers/ # Controladores de la lógica de negocio
│ └── empleados.controller.js
├── models/ # Modelos de datos (Mongoose, Sequelize, etc.)
│ └── Empleado.js
├── routes/ # Definición de rutas del API
│ └── empleados.routes.js
├── node_modules/
├── .gitignore
├── api.rest # Archivo de pruebas para endpoints (REST Client)
├── app.js # Configuración de la aplicación Express
├── database.js # Conexión a la base de datos
├── index.js # Punto de entrada del servidor
├── package.json
└── package-lock.json

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/backend-express.git
cd backend

### 2️⃣ Instalar dependencias
npm install

### 3️⃣ Iniciar el servidor

Modo desarrollo (con Nodemon):
npm run dev

🔗 Endpoints Principales
Método	Endpoint	Descripción
GET	/api/empleados	Obtiene todos los empleados
GET	/api/empleados/:id	Obtiene un empleado por ID
POST	/api/empleados	Crea un nuevo empleado
PUT	/api/empleados/:id	Actualiza un empleado
DELETE	/api/empleados/:id	Elimina un empleado
