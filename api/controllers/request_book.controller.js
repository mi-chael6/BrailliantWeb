const RequestBook = require("../models/requst_book.model");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// File upload config
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './files'),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});
const uploadFile = multer({ storage: fileStorage }).single("file");

// Image upload config
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "../src/images/"),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});
const uploadImage = multer({ storage: imageStorage }).single("image");

// Controllers
const uploadRequestBookFile = async (req, res) => {
    uploadFile(req, res, async (err) => {
        if (err) return res.status(500).json({ status: "error", error: err.message });

        try {
            const updatedBook = await RequestBook.findByIdAndUpdate(
                req.params.id,
                { request_book_file: req.file.filename },
                { new: true, runValidators: true }
            );
            res.json({ status: "ok", book: updatedBook });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    });
};

const uploadRequestBookImage = async (req, res) => {
    uploadImage(req, res, async (err) => {
        if (err) return res.status(500).json({ status: "error", error: err.message });

        try {
            const updatedBook = await RequestBook.findByIdAndUpdate(
                req.params.id,
                { request_book_img: req.file.filename },
                { new: true, runValidators: true }
            );
            res.json({ status: "ok", book: updatedBook });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    });
};

const getAllRequestBookFiles = async (req, res) => {
    try {
        const data = await RequestBook.find({});
        res.send({ status: 'ok', data });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

const getRequestBookImages = async (req, res) => {
    try {
        const data = await RequestBook.find({});
        res.send({ status: 'ok', data });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

const extractRequestBookPDFText = async (req, res) => {
    const { filename } = req.body;
    const filePath = path.join(__dirname, '..', 'files', filename);

    if (!fs.existsSync(filePath)) return res.status(404).send('File not found');

    try {
        const buffer = fs.readFileSync(filePath);
        const result = await pdfParse(buffer);
        res.send(result.text);
    } catch (err) {
        res.status(500).send('Error parsing PDF');
    }
};

// Other basic CRUD
const testconnection = (req, res) => res.json({ status: "Okay connection" });

const findAllRequestBooks = async (req, res) => {
    try {
        const books = await RequestBook.find();
        res.json({ books });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', err });
    }
};

const findRequestBookByName = async (req, res) => {
    try {
        const book = await RequestBook.findOne({ name: req.params.namex });
        res.json({ book });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', err });
    }
};

const createRequestBook = async (req, res) => {
    try {
        const newBook = await RequestBook.create(req.body);
        res.json({ book: newBook, status: 'Okay' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong with creating', err });
    }
};

const updateRequestBook = async (req, res) => {
    try {
        const updatedBook = await RequestBook.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        res.json({ book: updatedBook, status: 'Updated Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong with updating', err });
    }
};

const deleteRequestBook = async (req, res) => {
    try {
        const result = await RequestBook.findByIdAndDelete({ _id: req.params.id });
        res.json({ deleted: result, status: 'Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong with deleting', err });
    }
};

module.exports = {
    testconnection,
    deleteRequestBook,
    updateRequestBook,
    findRequestBookByName,
    findAllRequestBooks,
    createRequestBook,
    uploadRequestBookFile,
    uploadRequestBookImage,
    getAllRequestBookFiles,
    getRequestBookImages,
    extractRequestBookPDFText,
};
