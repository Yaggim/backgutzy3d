import express from 'express';
import pkg from 'body-parser';
import pool from './config/database.js';  
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

const { json, urlencoded } = pkg;
const app = express();
const PORT = process.env.PORT || 3000;

// Lista de orígenes permitidos
const allowedOrigins = ['https://backgutzy3d.onrender.com', 'https://yaggim.github.io/Gutzy3D-/', 'http://127.0.0.1:5501/']; // Añade aquí los orígenes permitidos

// Configuración de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permite solicitudes sin origen (como postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  optionsSuccessStatus: 200 // Para navegadores legacy que necesiten status 200
};

// Middleware CORS
app.use(cors(corsOptions));

// Middleware para body parsing
app.use(json());
app.use(urlencoded({ extended: true }));

// Rutas API
app.use('/api', userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});