const commentModel = require('../models/commentsModel');
var mongoose = require('mongoose');
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
        $skip: (req.params.page - 1) * 5
    }, { $limit: 5 }
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
exports.updateLikeAndDislike = async (req, res) => {
    var objectCommentId = mongoose.Types.ObjectId(req.body._id);
    var like = req.body.like
    var dislike = req.body.dislike
    if(req.body.flag == 1){
        if(isNumber(req.body.like)){
            like = req.body.like + 1
        }else{
            like = 1
        }
    }else {
        if(isNumber(req.body.dislike)){
            dislike = req.body.dislike + 1
        }else{
            dislike = 1
        }
    }
    var result = await commentModel.update(
        {_id:objectCommentId},
        {$set:{
            like:like,
            dislike:dislike
        }});
    if (result != null) {
        res.send('success');
    }
}
exports.countTotalReviews = async (req, res) => {
    var result1 = await commentModel.find({"companyCd": req.body.companyCd,"evaluation":1});
    var result2 = await commentModel.find({"companyCd": req.body.companyCd,"evaluation":2});
    var result3 = await commentModel.find({"companyCd": req.body.companyCd,"evaluation":3});
    var result4 = await commentModel.find({"companyCd": req.body.companyCd,"evaluation":4});
    var result5 = await commentModel.find({"companyCd": req.body.companyCd,"evaluation":5});
    var length1 = result1.length;
    var length2 = result2.length;
    var length3 = result3.length;
    var length4 = result4.length;
    var length5 = result5.length;
    
    var objRating = {
        onestar:length1,
        twostar:length2,
        threestar:length3,
        fourstar:length4,
        fivestar:length5,
    }
    res.send(objRating)
}
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
 