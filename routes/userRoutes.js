// routes/userRoutes.js
import { Router } from 'express';
import { crearUsuario, loginUsuario } from '../controllers/userController.js'; 
import { crearRol } from '../controllers/rolController.js'; 
import { agregarProducto, modificarProducto, obtenerProductos } from '../controllers/productController.js';


const router = Router();

// Ruta para crear un nuevo usuario
router.post('/usuarios', crearUsuario);
router.post('/rol', crearRol);
router.post('/productos', agregarProducto);
router.put('/productos', modificarProducto);
router.get('/productos', obtenerProductos);
router.post('/login', loginUsuario);


export default router;