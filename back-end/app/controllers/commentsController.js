const commentModel = require('../models/commentsModel');

exports.saveComment = async (req, res) => {
    const paramComment = new commentModel({
        contents: req.body.contents,
        evaluation: req.body.evaluation,
        salary: req.body.salary,
        companyCd: req.body.companyCd
    });
    var result = await paramComment.save();
    if (result != null) {
        res.send('Save Success!');
    }
}
exports.getComments = async (req, res) => {
    var result = await commentModel.aggregate([{
        $lookup: {
            from: "replycomments",
            localField: "_id",
            foreignField: "commentId",
            as: "embeddata"
        }
    }, {
        $match: { companyCd: req.params.idCompany }
    }, { $sort: { createdAt: -1 } }])
    if (result != null) {
        res.send(result);
    }
}