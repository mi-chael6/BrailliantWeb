const BookReadController = require('../controllers/book_read.controller');

module.exports = app => {
    app.post('/api/create/bookread', BookReadController.createBookRead);
    app.get('/api/test', BookReadController.testconnection);
    app.post('/api/bookread/:id', BookReadController.findBookReadById);
    app.get('/api/bookread/:namex', BookReadController.findBookReadByName);
};
