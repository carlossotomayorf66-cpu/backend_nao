import { Router } from 'express';
import { MySQLProductRepository } from './repositories/mysql-product.repository.js';
import { ProductService } from '../application/product.service.js';
import { ProductController } from './controllers/product.controller.js';
import { MySQLUserRepository } from './repositories/mysql-user.repository.js';
import { AuthService } from '../application/auth.service.js';
import { AuthController } from './controllers/auth.controller.js';
import { authMiddleware } from './middlewares/auth.middleware.js';
import { MySQLClientRepository } from './repositories/mysql-client.repository.js';
import { ClientService } from '../application/client.service.js';
import { ClientController } from './controllers/client.controller.js';

const router = Router();

// Inyección de dependencias - Productos
const productRepository = new MySQLProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Inyección de dependencias - Usuarios/Auth
const userRepository = new MySQLUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Inyección de dependencias - Clientes
const clientRepository = new MySQLClientRepository();
const clientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);

// Rutas de Autenticación
router.post('/auth/login', authController.login);

// Rutas de Productos (Protegidas)
router.get('/products', authMiddleware, productController.getAll);
router.get('/products/:id', authMiddleware, productController.getById);
router.post('/products', authMiddleware, productController.create);
router.put('/products/:id', authMiddleware, productController.update);
router.delete('/products/:id', authMiddleware, productController.delete);

// Rutas de Clientes (Protegidas)
router.get('/clients', authMiddleware, clientController.getAll);
router.get('/clients/:id', authMiddleware, clientController.getById);
router.post('/clients', authMiddleware, clientController.create);
router.put('/clients/:id', authMiddleware, clientController.update);
router.delete('/clients/:id', authMiddleware, clientController.delete);

export default router;
