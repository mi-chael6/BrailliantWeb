const StudentController = require('../controllers/student.controller')

module.exports = app => {
    app.get('/api/allstudents', StudentController.findAllStudent)
    app.get('/api/test', StudentController.testconnection)
    app.post('/api/newstudent', StudentController.createStudent)
    app.get('/api/student/:namex', StudentController.findStudentByName)
    app.get('/api/allstudents/:namex', StudentController.findStudentByTeacher)
    app.get('/api/allstudents/section/:namex', StudentController.findStudentsBySection)
    app.put('/api/update/student/:id', StudentController.updateStudent)
    app.delete('/api/delete/student/:id', StudentController.deleteStudent)
    app.delete('/api/delete/student/section/:namex', StudentController.deleteStudentBySection)
    app.get('/api/students/count', StudentController.getStudentCount);
}