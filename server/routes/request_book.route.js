const RequestBookController = require('../controllers/request_book.controller');

module.exports = app => {
    app.get('/api/allrequestbooks', RequestBookController.findAllRequestBooks);
    app.get('/api/test', RequestBookController.testconnection);
    app.post('/api/newrequestbook', RequestBookController.createRequestBook);
    app.get('/api/requestbook/:namex', RequestBookController.findRequestBookByName);
    app.put('/api/update/requestbook/:id', RequestBookController.updateRequestBook);
    app.delete('/api/delete/requestbook/:id', RequestBookController.deleteRequestBook);

    // 🆕 Upload and PDF-related routes
    app.put('/upload-requestfiles/:id', RequestBookController.uploadRequestBookFile);
    app.put('/upload-requestimage/:id', RequestBookController.uploadRequestBookImage);
    app.get('/get-requestfiles', RequestBookController.getAllRequestBookFiles);
    app.get('/get-requestimage', RequestBookController.getRequestBookImages);
    app.post('/extract-requestbook-text', RequestBookController.extractRequestBookPDFText);
};
