const mongoose = require('mongoose')
const { Schema, model } = mongoose

const BookReadSchema = new Schema({
    book_read_title: {
        type: String
    },
    book_read_time_elapsed: {
        type: Number
    },
    book_read_date: {
        type: Date
    },
    book_read_student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
})

const BookRead = model('BookRead', BookReadSchema)

module.exports = BookRead