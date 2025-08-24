const RequestBookController = require('../controllers/request_book.controller');

module.exports = app => {
    app.get('/api/allrequestbooks', RequestBookController.findAllRequestBooks);
    app.get('/api/test', RequestBookController.testconnection);
    app.post('/api/newrequestbook', RequestBookController.createRequestBook);
    app.get('/api/requestbook/:namex', RequestBookController.findRequestBookByName);
    app.put('/api/update/requestbook/:id', RequestBookController.updateRequestBook);
    app.delete('/api/delete/requestbook/:id', RequestBookController.deleteRequestBook);

    app.put('/upload-requestfiles/:id', RequestBookController.uploadBookFileMiddleware, RequestBookController.uploadRequestBookFile);
    app.get('/get-requestfiles', RequestBookController.getAllRequestBookFiles);
    app.put('/upload-requestimage/:id', RequestBookController.uploadBookImageMiddleware, RequestBookController.uploadRequestBookImage);
    app.get('/get-requestimage', RequestBookController.getRequestBookImages);

    app.post('/extract-requestbook-text', RequestBookController.extractRequestBookPDFText);
};
