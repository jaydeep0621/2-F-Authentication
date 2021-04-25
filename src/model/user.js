const mongoose = require("mongoose");

const user = new mongoose.Schema(
    {
        name:{
            require: true,
            type: String
        },
        email:{
            require: true,
            unique: true,
            type: String
        },
        phone_number:{
            require: true,
            type: String,
            unique: true
        },
        type_of_id:{
            require:true,
            type: String,
        },
        kyc_done:{
            type: Boolean,
            require: true,
            default: false
        },
        display_picture:{
            type: String,
        },
        doc_photo:{
            type: String
        }
    }
)

module.exports = mongoose.model("User", user);