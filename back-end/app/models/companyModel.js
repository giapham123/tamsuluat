const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    companyCd:String,
    companyNm:String,
    image:String,
    sizePeople:String
}, {
    timestamps: true
});

module.exports = mongoose.model('companys', NoteSchema);