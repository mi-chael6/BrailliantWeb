const BookRead = require("../models/book_read.model");
const mongoose = require('mongoose');

const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findBookReadById = (req, res) => {
    BookRead.findById(req.params.id)
        .then((theBook) => {
            res.json({ book: theBook });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err });
        });
};

const findBookReadByName = (req, res) => {
    BookRead.find({ book_read_student_id: req.params.namex })
        .then((theBook) => {
            res.json({ book: theBook })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const createBookRead = (req, res) => {
    const sectionData = {
        ...req.body,
        book_read_student_id: new mongoose.Types.ObjectId(req.body.book_read_student_id)
    };

    BookRead.create(sectionData)
        .then((newBook) => {
            res.json({ book: newBook, status: 'Okay' });
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong with creating', err });
        });
};




module.exports = {
    testconnection,
    findBookReadById,
    findBookReadByName,
    createBookRead,
};