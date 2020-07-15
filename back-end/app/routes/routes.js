module.exports = (app) => {
    const commentsRoute = require('../routes/commentRoutes');
    const companyRoute = require('../routes/companyRoutes');
    const replyRoute = require('../routes/replyRoutes');

    app.use('/',replyRoute)
    app.use('/',companyRoute)
    app.use('/',commentsRoute)
}
