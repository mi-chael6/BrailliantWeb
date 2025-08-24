const SectionController = require('../controllers/section.controller')

module.exports = app => {
    app.get('/api/allsections', SectionController.findAllSection)
    app.get('/api/allsections/:namex', SectionController.findSectionByTeacher)
    app.get('/api/test', SectionController.testconnection)
    app.post('/api/newsection', SectionController.createSection)
    app.get('/api/section/:namex', SectionController.findSectionByName)
    app.put('/api/update/section/:id', SectionController.updateSection)
    app.delete('/api/delete/section/:id', SectionController.deleteSection)

    app.get('/api/sections/count', SectionController.getSectionCount);
    app.get('/api/section/id/:id', SectionController.findSectionById);

}