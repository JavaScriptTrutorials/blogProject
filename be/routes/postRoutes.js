const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.posts_get);
router.post('/', checkAuth, postController.post_create);
router.delete('/:id', checkAuth, postController.post_delete);
router.put('/:id', postController.post_update);

module.exports = router;