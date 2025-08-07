const { useRef } = require("react")
const Admin = require("../models/admin.model")
const bcrypt = require('bcrypt');


const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllAdmin = (req, res) => {
    Admin.find()
        .then((allAdmin) => {
            res.json({ admins: allAdmin })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findUserByName = (req, res) => {
    Admin.findOne({ name: req.params.namex })
        .then((theUser) => {
            res.json({ user: theUser })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const createAdmin = async (req, res) => {
    try {
        const { admin_password, ...rest } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(admin_password, salt);

        const newAdmin = await Admin.create({
            ...rest,
            admin_password: hashedPassword
        });

        res.json({ admin: newAdmin });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create admin', err });
    }
};

const updateAdmin = (req, res) => {
    Admin.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updatedAdmin) => {
            res.json({ admin: updatedAdmin, status: 'Updated Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const deleteUser = (req, res) => {
    Admin.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.json({ useRef: result, status: 'Deleted Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

module.exports = { testconnection, createAdmin, findAllAdmin, updateAdmin }