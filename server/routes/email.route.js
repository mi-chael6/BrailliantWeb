const EmailController = require('../controllers/email.controller');

module.exports = app => {
    app.post('/send-email', EmailController.sendEmail);
};
