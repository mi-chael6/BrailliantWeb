const mongoose = require('mongoose')
const { Schema, model } = mongoose

const StudentSchema = new Schema({
    student_lname: {
        type: String
    },
    student_fname: {
        type: String
    },
    student_mi: {
        type: String
    },
    student_dob: {
        type: Date
    },
    student_age: {
        type: Number
    },
    student_gender: {
        type: String
    },
    student_section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true,
    },
    student_section_name: {
        type: String
    },
    student_instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    student_prev_book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }
})

const Student = model('Student', StudentSchema)

module.exports = Student