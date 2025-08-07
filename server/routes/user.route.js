const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.get('/api/allusers', UserController.findAllUser);
    app.get('/api/test', UserController.testconnection);
    app.post('/api/newuser', UserController.createUser);
    app.get('/api/user/user/:namex', UserController.findUserByName);
    app.put('/api/update/user/:id', UserController.updateUser);
    app.delete('/api/delete/user/:id', UserController.deleteUser);

    app.put(
        '/upload-profile-icon/:id',
        UserController.uploadProfileIconMiddleware,
        UserController.uploadProfileIcon
    );
};
