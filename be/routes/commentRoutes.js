const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const checkAuth = require('../middlewares/checkAuth.middleware');

router.post('/', checkAuth, commentController.comment_create);
router.get('/', commentController.comments_get);
router.get('/:id', commentController.comment_get);
router.delete('/:id',checkAuth, commentController.comment_delete);
router.put('/:id', checkAuth, commentController.comment_update);
router.get('/subcomments/:id', commentController.subcomments_get);

module.exports = router;