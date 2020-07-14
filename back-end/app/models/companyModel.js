const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const NoteSchema = mongoose.Schema({
    companyCd:String,
    companyNm:String,
    image:String,
    sizePeople:String,
    addressCd: String,
    count: String
}, {
    timestamps: true
});
NoteSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

module.exports = mongoose.model('companys', NoteSchema);