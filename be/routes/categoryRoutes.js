const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.create_post);
router.get('/', categoryController.category_get_all);

module.exports = router;