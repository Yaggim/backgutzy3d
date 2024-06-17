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


export async function modificarProducto(req, res) {
    try {
        const { id, descripcion, precio, cantidad, habilitado, imagen } = req.body;
    
        const [result] = await pool.query(
            'CALL ModificarProducto(?, ?, ?, ?, ?, ?)',
            [id, descripcion, precio, cantidad, habilitado, imagen]
        );

        res.status(200).send('Producto modificado correctamente');
    } catch (error) {
        console.error('Error al modificar producto:', error);
        res.status(500).send('Error al modificar producto');
    }
}

export async function obtenerProductos(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM binq74jhcfim1oxvuda1.producto');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
}