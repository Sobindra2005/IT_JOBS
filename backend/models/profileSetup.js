const mongoose = require('mongoose')

const profileSetupSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    profilePic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
    ,
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    dob: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,

    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
        required: true
    },
    postalCode: {
        type: String,
        trim: true,
        required: true
    },
    PhoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    altPhoneNumber: {
        type: String,
        trim: true

    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    Nationality: {
        type: String,
        trim: true,
        required: true
    },
    languages: [{
        type: String,
        trim: true,
        required: true
    }],
    protofolio: {
        type: String,
        trim: true
    },
    github: {
        type: String,
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    twitter: {
        type: String,
        trim: true
    },
    facebook: {
        type: String,
        trim: true
    },
    linkedln: {
        type: String,
        trim: true
    },
    Bio: {
        type: String,
       trim:true
   }
})


const profile = mongoose.model('profile', profileSetupSchema)


module.exports = { profile }