var express = require('express');
var router = express.Router();

const replyCommentController = require('../controllers/replycommentController');

router.post('/saveReplyComments', replyCommentController.saveReplyComment);
router.post('/getReplyOfComment', replyCommentController.getReplyOfComment);


module.exports = router;