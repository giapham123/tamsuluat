const replyCommentModel = require('../models/replycommentModel');
var mongoose = require('mongoose');
exports.saveReplyComment = async (req,res) => {
    var objectId = mongoose.Types.ObjectId(req.body.commentId);
    const paramReplyComment = new replyCommentModel({
        contents: req.body.contents,
        commentId: objectId
    });
    var result = await paramReplyComment.save();
    if(result != null){
        res.send('Save Success!');
    }
}