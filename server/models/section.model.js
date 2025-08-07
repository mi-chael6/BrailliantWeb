const mongoose = require('mongoose')
const { Schema, model } = mongoose

const SectionSchema = new Schema({
    section_name: {
        type: String
    },
    section_level: {
        type: String
    },
    section_instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Section = model('Section', SectionSchema)

module.exports = Section