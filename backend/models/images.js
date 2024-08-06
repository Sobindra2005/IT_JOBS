const mongoose = require('mongoose')


const ImageSchema = new mongoose.Schema({
    fileName: String,
    url: String,
    cloudinary_id: String,
}, { timeStamps: true })

const Image = mongoose.model('Image', ImageSchema)

module.exports = { Image }