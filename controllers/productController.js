import pool from '../config/database.js';

export async function agregarProducto(req, res) {
    try {
        const { descripcion, precio, cantidad, habilitado, imagen, nombre } = req.body;
    
        const [result] = await pool.query(
            'CALL AgregarProducto(?, ?, ?, ?, ?, ?)',
            [descripcion, precio, cantidad, habilitado, imagen, nombre]
        );

        res.status(200).send('Producto agregado correctamente');
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).send('Error al agregar producto');
    }
}