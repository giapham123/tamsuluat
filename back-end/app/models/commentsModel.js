const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    contents: String,
    evaluation: String,
    salary: String,
    companyCd: String
}, {
    timestamps: true
});

module.exports = mongoose.model('comments', CommentSchema);