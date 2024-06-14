
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';


dotenv.config();  // Carga las variables de entorno desde el archivo .env


// Configuración del pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});


// Manejar eventos de conexión
pool.on('connection', function (connection) {
  console.log('Conexión establecida con la base de datos.');
});

pool.on('error', function (err) {
  console.error('Error de conexión a la base de datos:', err);
});

// Verificar si estás conectado
function checkDatabaseConnection() {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error('No se pudo obtener una conexión:', err);
    } else {
      console.log('Conexión exitosa a la base de datos.');
      connection.release(); // Liberar la conexión después de usarla
    }
  });
}

// Llamar a la función para verificar la conexión
checkDatabaseConnection();


export default pool;