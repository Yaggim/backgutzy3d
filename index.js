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

// Configuración de CORS
const corsOptions = {
  origin: 'https://nombre-del-servicio.onrender.com', // Reemplaza esto con el origen de tu frontend
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