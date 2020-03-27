const commentModel = require('../models/commentsModel');

exports.saveComment = async (req, res) => {
    const paramComment = new commentModel({
        contents: req.body.contents,
        evaluation: req.body.evaluation,
        // salary: req.body.salary,
        companyCd: req.body.companyCd,
        commentName: req.body.staffNm,
        department: req.body.department
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
    }, {
        $sort: { createdAt: -1 }
    }, {
        $skip: 0 * 10
    }, { $limit: 10 }
    ])
    if (result != null) {
        res.send(result);
    }
}
exports.getCommentsLoadMore = async (req, res) => {
    var result = await commentModel.aggregate([{
        $lookup: {
            from: "replycomments",
            localField: "_id",
            foreignField: "commentId",
            as: "embeddata"
        }
    }, {
        $match: { companyCd: req.params.idCompany }
    }, {
        $sort: { createdAt: -1 }
    }, {
        $skip: (req.params.page - 1) * 10
    }, { $limit: 10 }
    ])
    if (result != null) {
        res.send(result);
    }
}
exports.getCommentsLatest = async (req, res) => {
    var result = await commentModel.aggregate([{
        $lookup: {
            from: 'companys',
            localField: 'companyCd',
            foreignField: 'companyCd',
            as: 'companys'
        }
    }, {
        $sort: { createdAt: -1 }
    }, { $limit: 10 }
    ])
    if (result != null) {
        res.send(result);
    }
}
