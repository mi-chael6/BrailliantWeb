const { useRef } = require("react")
const Book = require("../models/book.model");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// ---------- FILE UPLOAD CONFIG ----------
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './files'),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});
const upload = multer({ storage: storage }).single("file");

// ---------- IMAGE UPLOAD CONFIG ----------
const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "../src/images/"),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});
const imgUpload = multer({ storage: imgStorage }).single("image");

// ---------- CONTROLLERS ----------
const uploadBookFile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ status: "error", error: err.message });

        try {
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                { book_file: req.file.filename },
                { new: true, runValidators: true }
            );
            res.json({ status: "ok", book: updatedBook });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    });
};

const uploadBookImage = async (req, res) => {
    imgUpload(req, res, async (err) => {
        if (err) return res.status(500).json({ status: "error", error: err.message });

        try {
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                { book_img: req.file.filename },
                { new: true, runValidators: true }
            );
            res.json({ status: "ok", book: updatedBook });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    });
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
    extractPDFText
};