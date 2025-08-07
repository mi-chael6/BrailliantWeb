const { useRef } = require("react")
const AuditTrail = require("../models/audit_trail.model");


const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllAuditTrail = (req, res) => {
    AuditTrail.find()
        .then((allAuditTrail) => {
            res.json({ audit_trail: allAuditTrail })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findAuditTrailByName = (req, res) => {
    AuditTrail.findOne({ name: req.params.namex })
        .then((theAuditTrail) => {
            res.json({ audit_trail: theAuditTrail })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const createAuditTrail = (req, res) => {
    AuditTrail.create(req.body)
        .then((newAuditTrail) => {
            res.json({ audit_trail: newAuditTrail, status: 'Okay' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })

}


const updateAuditTrail = (req, res) => {
    AuditTrail.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updatedAuditTrail) => {
            res.json({ audit_trail: updatedAuditTrail, status: 'Updated Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const deleteAuditTrail = (req, res) => {
    AuditTrail.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.json({ useRef: result, status: 'Deleted Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

module.exports = { testconnection, deleteAuditTrail, updateAuditTrail, findAuditTrailByName, findAllAuditTrail, createAuditTrail }