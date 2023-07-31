const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateToken = require('../middleware/authMiddleware');

// Rutas protegidas para CRUD de productos
router.post('/', validateToken, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/admin', validateToken, productController.getAllProductsAdmin);
router.get('/my-products', validateToken, productController.getProductsByUserId);
router.get('/:id', validateToken, productController.getProductById);
router.put('/:id', validateToken, productController.updateProduct);
router.delete('/:id', validateToken, productController.deleteProduct);

module.exports = router;
