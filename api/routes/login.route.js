const AuthController = require('../controllers/login.controller');

module.exports = app => {
    app.post('/api/login', AuthController.login);
    app.post('/api/handle-credentials', AuthController.handleCredentials);
    app.post('/api/verify-email', AuthController.handleEmailVerifiction);
    app.put('/api/update-password', AuthController.handlePasswordUpdate);
    app.post('/api/otp-verified', AuthController.markOtpVerified); 

};
