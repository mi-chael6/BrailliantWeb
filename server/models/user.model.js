const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    user_fname: {
        type: String
    },
    user_lname: {
        type: String
    },
    user_email: {
        type: String
    },
    user_dob: {
        type: String
    },
    user_password: {
        type: String
    },
    user_img: {
        type: String
    },
    user_last_in: {
        type: Date
    },
    user_recent_act: {
        type: String
    },
    user_status: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    user_otp_verified_at: {
        type: Date,
        default: null
    }
})

const User = model('User', UserSchema)

module.exports = User