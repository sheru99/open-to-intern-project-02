const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const internModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
        
    },
    mobile: {
        type: String,
        unique: true,
        trim: true
        
    },
    collegeId: {
        type: ObjectId,
        ref: "Collage",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model("internModel",internModel)