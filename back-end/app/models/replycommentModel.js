const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    contents: String,
    commentId: Object
}, {
    timestamps: true
});

module.exports = mongoose.model('replycomments', CommentSchema);