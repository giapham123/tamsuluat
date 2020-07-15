var express = require('express');
var router = express.Router();


const commentController = require('../controllers/commentsController');

router.post('/saveComments', commentController.saveComment);
router.get('/getComments/:idCompany', commentController.getComments);
router.get('/getComments/loadmore/:idCompany&paging=:page', commentController.getCommentsLoadMore);
router.get('/getCommentsLatest', commentController.getCommentsLatest);


module.exports = router;