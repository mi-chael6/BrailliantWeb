const mongoose = require('mongoose')
const { Schema, model } = mongoose

const FileSchema = new Schema({
    file: {
        type: String
    },

}, { collection: "FileDetails" })

const File = model('File', FileSchema)

module.exports = File