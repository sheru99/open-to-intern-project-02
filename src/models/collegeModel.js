const mongoose = require("mongoose")
// const url = mongoose.SchemaType.url
const url = require('mongoose-type-url')


const collageModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"please Enter  Name"],
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        required: "Please Enter full Name"  
    },
    logoLink: {
        type: url,
        required: "Please Provide LogoLink"
    },

    isDeleted: {
        type: Boolean,
        default: false
    }   
})



module.exports = mongoose.model("CollageModel",collageModel)

