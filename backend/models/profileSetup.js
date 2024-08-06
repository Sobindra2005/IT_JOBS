const mongoose = require('mongoose')

const profileSetupSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    profilePic:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Image'
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
    streetAddress: {
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
    languages: {
        type: String,
        trim: true,
        required: true
    },
})


const profile= mongoose.model('profile',profileSetupSchema)


module.exports={profile}