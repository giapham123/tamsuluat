module.exports = (app) => {
    const multer = require('multer')
    const fs = require('fs')
    const companyController = require('../controllers/companyController');
    const commentController = require('../controllers/commentsController');
    const replyCommentController = require('../controllers/replycommentController');

    var storage = multer.diskStorage({
    });
    var upload = multer({
        storage: storage
    });

    var storageImage = multer.diskStorage({
        destination: function(req, file, callback){
            var dir = './thumnail'
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir)
            }
            callback(null, dir)
        },
        filename: function(req,file, callback){
            callback(null, file.originalname)
        }
    });
    var uploadImage = multer({storage:storageImage}).array('files',4000)

    var uploadmulter = upload.single('file');
    app.post('/uploadImage',uploadImage, companyController.uploadImages);
    app.post('/insertCompany',uploadmulter, companyController.insertCompany);
    app.post('/getCompany', companyController.getCompanyNm);
    app.get('/getCompanyForSelect', companyController.getCompanyNmForSelect);
    app.get('/getAddress', companyController.getAddressNm);
    app.post('/getCompanyForSearch',companyController.searchComp);
    //Comment API
    app.post('/saveComments', commentController.saveComment);
    app.get('/getComments/:idCompany', commentController.getComments);
    app.get('/getComments/loadmore/:idCompany&paging=:page', commentController.getCommentsLoadMore);
    app.get('/getCommentsLatest', commentController.getCommentsLatest);
    //Reply Comments API
    app.post('/saveReplyComments', replyCommentController.saveReplyComment);
    app.post('/getReplyOfComment', replyCommentController.getReplyOfComment);
}
