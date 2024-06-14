import pool from '../config/database.js';

export async function crearRol(req, res) {
    try {
        const { nombre } = req.body;

        const [result] = await pool.query(
            'CALL AgregarRol(?)',
            [nombre]
        );

        res.status(200).send('Rol creado correctamente');
    } catch (error) {
        console.error('Error al crear rol:', error);
        if (error.sqlState === '45000') {
            res.status(400).send(error.sqlMessage);
        } else {
            res.status(500).send('Error al crear rol');
        }
    }
}