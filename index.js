import express from 'express';
import pkg from 'body-parser';
import pool from './config/database.js';  
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Lista de orígenes permitidos
const allowedOrigins = ['https://backgutzy3d.onrender.com', 'https://yaggim.github.io/Gutzy3D-/']; // Añade aquí los orígenes permitidos

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


const { json, urlencoded } = pkg;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Ruta por defecto para servir el archivo 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(cors(corsOptions));
// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Rutas
app.use('/api', userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});