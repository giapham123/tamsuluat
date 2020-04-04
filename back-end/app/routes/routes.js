module.exports = (app) => {
    const multer = require('multer')
    const companyController = require('../controllers/companyController');
    const commentController = require('../controllers/commentsController');
    const replyCommentController = require('../controllers/replycommentController');
    var storage = multer.diskStorage({
    });
    var upload = multer({
        storage: storage
    });
    var uploadmulter = upload.single('file');
    app.post('/insertCompany',uploadmulter, companyController.insertCompany);
    app.get('/getCompany', companyController.getCompanyNm);
    app.get('/getAddress', companyController.getAddressNm);
    //Comment API
    app.post('/saveComments', commentController.saveComment);
    app.get('/getComments/:idCompany', commentController.getComments);
    app.get('/getComments/loadmore/:idCompany&paging=:page', commentController.getCommentsLoadMore);
    app.get('/getCommentsLatest', commentController.getCommentsLatest);
    //Reply Comments API
    app.post('/saveReplyComments', replyCommentController.saveReplyComment);
    app.post('/getReplyOfComment', replyCommentController.getReplyOfComment);
}
