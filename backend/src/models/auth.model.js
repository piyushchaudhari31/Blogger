const mongoose = require('mongoose');

const authschema = new mongoose.Schema({

    fullName: {
        type: String,     // frontend sends "John Doe"
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profilePic: {
        type: String
    },

    gender: {
        type: String,
        enum: ["male", "female"], 
        default: "male"
    },

    isEmailVarify: {
        type: Boolean,
        default: false
    },

    otpVarify: {
        type: Boolean,
        default: false
    },

    otp: {
        type: String
    },

    otpExpire: {
        type: Number,
        default: 0
    }
});

const authModel = mongoose.model("User", authschema);
module.exports = authModel;
