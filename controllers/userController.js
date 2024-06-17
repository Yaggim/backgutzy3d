import pool from '../config/database.js';

// Función para crear un usuario
export async function crearUsuario(req, res) {
    try {
        const { nombre, apellido, email, password } = req.body;

        // Verifica si el email ya existe en la tabla usuario
        const [existingUser] = await pool.query(
            'SELECT * FROM usuario WHERE Email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        // Fecha actual para el registro
        const fechaRegistro = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(fechaRegistro);

        // Inserta el cliente usando el procedimiento almacenado AgregarCliente
        const [clienteResult] = await pool.query(
            'CALL AgregarCliente(?, ?, ?, ?)',
            [nombre, apellido, email, fechaRegistro]
        );

        const idCliente = clienteResult.insertId;

        // Inserta el usuario asociado al cliente con rol USUARIO (asumimos Id_Rol = 2 para USUARIO)
        await pool.query(
            'INSERT INTO usuario (Clave, Email, Id_Rol, Id_Cliente) VALUES (?, ?, ?, ?)',
            [password, email, 2, idCliente]
        );

        res.status(201).json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error en el registro' });
    }
}