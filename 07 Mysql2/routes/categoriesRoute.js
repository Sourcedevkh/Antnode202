const expres = require('express');
const categoryController = require('../controllers/categoriesController');
const router = expres.Router();

router.get('/categories', categoryController.getAll);
router.get('/categories/:id', categoryController.getById);
router.post('/categories', categoryController.create);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.deleteCategory);


module.exports = router;