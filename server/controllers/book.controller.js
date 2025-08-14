const Book = require("../models/book.model");
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.config');

// Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'book_images',
        allowed_formats: ['jpg', 'jpeg', 'png'],


    }
});

// Cloudinary storage for PDF files
const fileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'book_files',
        allowed_formats: ['pdf'],
        resource_type: "auto",
        access_mode: "public"


    }
});

// Middlewares
const bookImageMiddleware = multer({ storage: imageStorage }).single('bookImage');
const bookFileMiddleware = multer({ storage: fileStorage }).single('bookFile');



// ---------- CONTROLLERS ----------
const uploadBookFile = async (req, res) => {
    try {
        const fileUrl = req.file.path;

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { book_file: fileUrl },
            { new: true, runValidators: true }
        );

        res.json({ status: "ok", book: updatedBook, fileUrl });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const uploadBookImage = async (req, res) => {
    try {
        const imageUrl = req.file.path;

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { book_img: imageUrl },
            { new: true, runValidators: true }
        );

        res.json({ status: "ok", book: updatedBook, imageUrl });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const getAllBooksFiles = async (req, res) => {
    try {
        Book.find({}).then(data => {
            res.send({ status: 'ok', data: data })
        })
    } catch (error) {
    }
};


const extractPDFText = async (req, res) => {
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

///////////////////////////////////////////////////////////////

const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllBooks = (req, res) => {
    Book.find()
        .then((allBooks) => {
            res.json({ books: allBooks })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findBookById = (req, res) => {
    Book.findById(req.params.id)
        .then((theBook) => {
            res.json({ book: theBook });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err });
        });
};

const findBookByName = (req, res) => {
    Book.findOne({ _id: req.params.namex })
        .then((theBook) => {
            res.json({ book: theBook })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const createBook = (req, res) => {
    Book.create(req.body)
        .then((newBook) => {
            res.json({ book: newBook, status: 'Okay' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })

}


const updateBook = (req, res) => {
    Book.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updatedBook) => {
            res.json({ book: updatedBook, status: 'Updated Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const deleteBook = (req, res) => {
    Book.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.json({ useRef: result, status: 'Deleted Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const getBookCount = async (req, res) => {
    try {
        const count = await Book.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRankedBooks = async (req, res) => {
    try {
        const rankedBooks = await Book.find()
            .sort({ book_count: -1 })
            .limit(5);
        res.json(rankedBooks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch ranked books' });
    }
};

const incrementBook = async (req, res) => {
    Book.findByIdAndUpdate(
        req.params.id,
        { $inc: { book_count: 1 } },
        { new: true, runValidators: true }
    )
        .then((updatedBook) => {
            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json({ book: updatedBook, status: 'Updated Successfully' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', err });
        });
};




module.exports = {
    testconnection,
    deleteBook,
    updateBook,
    findBookByName,
    findAllBooks,
    createBook,
    getBookCount,
    uploadBookFile,
    getAllBooksFiles,
    uploadBookImage,
    extractPDFText,
    findBookById,
    incrementBook,
    getRankedBooks,
    bookImageMiddleware,
    bookFileMiddleware
};

