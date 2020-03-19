const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    addressNm:String
}, {
    timestamps: true
});

module.exports = mongoose.model('address', NoteSchema);