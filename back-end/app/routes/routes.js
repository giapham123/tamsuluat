module.exports = (app) => {
    const companyController = require('../controllers/companyController');
    const commentController = require('../controllers/commentsController');
    const replyCommentController = require('../controllers/replycommentController');

    app.get('/getCompany', companyController.getCompanyNm);
    app.get('/getAddress', companyController.getAddressNm);
    //Comment API
    app.post('/saveComments', commentController.saveComment);
    app.get('/getComments/:idCompany', commentController.getComments);
    //Reply Comments API
    app.post('/saveReplyComments', replyCommentController.saveReplyComment);
}
