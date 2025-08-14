const RequestBook = require("../models/requst_book.model");
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.config');


// Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'request_book_images',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
});

// Cloudinary storage for PDF files
const fileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'request_book_files',
        resource_type: "auto",
        access_mode: "public",
        allowed_formats: ['pdf'],

    }
});

// Middlewares
const uploadBookImageMiddleware = multer({ storage: imageStorage }).single('bookImage');
const uploadBookFileMiddleware = multer({ storage: fileStorage }).single('bookFile');



// Controllers
const uploadRequestBookFile = async (req, res) => {
    try {
        const fileUrl = req.file.path;

        const updatedBook = await RequestBook.findByIdAndUpdate(
            req.params.id,

            { request_book_file: fileUrl },
            { new: true, runValidators: true }
        );

        res.json({ status: "ok", book: updatedBook, fileUrl });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const uploadRequestBookImage = async (req, res) => {
    try {
        const imageUrl = req.file.path;

        const updatedBook = await RequestBook.findByIdAndUpdate(
            req.params.id,
            { request_book_img: imageUrl },
            { new: true, runValidators: true }
        );

        res.json({ status: "ok", book: updatedBook, imageUrl });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
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
    const { pdfUrl } = req.body;
    console.log(pdfUrl)
    try {
        const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);

        const result = await pdfParse(buffer);

        res.send(result.text);


    } catch (err) {
        console.error('Error parsing PDF:', err);
        res.status(500).json({ message: 'Error parsing PDF', error: err });
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
    uploadBookImageMiddleware,
    uploadBookFileMiddleware
};

