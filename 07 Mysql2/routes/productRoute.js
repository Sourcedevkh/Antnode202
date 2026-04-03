const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.getAll);
router.get('/product/:id', productController.getById);
router.post('/products', productController.create);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;