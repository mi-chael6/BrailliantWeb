const mongoose = require('mongoose')
const { Schema, model } = mongoose

const RequestBookSchema = new Schema({
    request_book_title: {
        type: String
    },
    request_book_author: {
        type: String
    },
    request_book_genre: {
        type: String
    },
    request_book_date_published: {
        type: Date
    },
    request_book_level: {
        type: String
    },
    request_book_description: {
        type: String
    },
    request_book_img: {
        type: String
    },
    request_book_file: {
        type: String
    },
    request_book_status: {
        type: String
    },
    request_by: {
        type: String
    }
})

const RequestBook = model('RequestBook', RequestBookSchema)

module.exports = RequestBook