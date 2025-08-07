const mongoose = require('mongoose')
const { Schema, model } = mongoose

const BookSchema = new Schema({
    book_title: {
        type: String
    },
    book_author: {
        type: String
    },
    book_genre: {
        type: String
    },
    book_date_published: {
        type: Date
    },
    book_level: {
        type: String
    },
    book_description: {
        type: String
    },
    book_img: {
        type: String
    },
    book_file: {
        type: String
    },
    book_last_modified: {
        type: Date
    }
})

const Book = model('Book', BookSchema)

module.exports = Book