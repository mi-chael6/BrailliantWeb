const AuditTrailController = require('../controllers/audit_trail.controller')



module.exports = app => {
    app.get('/api/allaudittrail', AuditTrailController.findAllAuditTrail)
    app.get('/api/test', AuditTrailController.testconnection)
    app.post('/api/newaudittrail', AuditTrailController.createAuditTrail)
    app.get('/api/audittrail/:namex', AuditTrailController.findAuditTrailByName)
    app.put('/api/update/audittrail/:id', AuditTrailController.updateAuditTrail)
    app.delete('/api/delete/audittrail/:id', AuditTrailController.deleteAuditTrail)


}