// routes/userRoutes.js
import { Router } from 'express';
import { crearUsuario } from '../controllers/userController.js'; 
import { crearRol } from '../controllers/rolController.js'; 
import { agregarProducto } from '../controllers/productController.js';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/usuarios', crearUsuario);
router.post('/rol', crearRol);
router.post('/productos', agregarProducto);

export default router;