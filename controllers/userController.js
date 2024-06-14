import pool from '../config/database.js';

export async function crearUsuario(req, res) {
    try {
        const { nombre, contraseña, legajo, idRol } = req.body;

        const [result] = await pool.query(
            'CALL sp_CrearUsuario(?, ?, ?, ?)',
            [nombre, contraseña, legajo, idRol]
        );

        res.status(200).send('Usuario creado correctamente');
    } catch (error) {
        console.error('Error al crear usuario:', error);
        if (error.sqlState === '45000') {
            res.status(400).send(error.sqlMessage);
        } else {
            res.status(500).send('Error al crear usuario');
        }
    }
}