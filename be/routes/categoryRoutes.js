const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.create_post);

module.exports = router;