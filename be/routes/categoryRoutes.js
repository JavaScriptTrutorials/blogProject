const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const checkAuth = require('../middlewares/checkAuth.middleware');

router.post('/', checkAuth, categoryController.create_post);
router.get('/', categoryController.category_get_all);
router.get('/:id', categoryController.get_categoryBiId);
router.delete('/:id', checkAuth, categoryController.category_delete);
router.put('/:id', checkAuth, categoryController.category_update);

module.exports = router;