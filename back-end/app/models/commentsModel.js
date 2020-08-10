const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    contents: String,
    evaluation: Number,
    salary: String,
    companyCd: String,
    commentName: String,
    department: String,
    like: Number,
    dislike:Number
}, {
    timestamps: true
});

module.exports = mongoose.model('comments', CommentSchema);