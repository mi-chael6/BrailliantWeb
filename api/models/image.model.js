const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ImageSchema = new Schema({
    image: {
        type: String
    },

}, { collection: "ImageDetails" })

const Image = model('Image', ImageSchema)

module.exports = Image