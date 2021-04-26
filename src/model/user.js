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
        password:{
            require: true,
            type: String
        },
        type_of_id:{
            require:true,
            type: String,
        },
        id_number:{
            type: String,
            required: true,
            unique: true
        },
        date_of_birth:{
            type: String
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

user.static({

    existemail(email){
        return this.findOne({email:email});
    },

    existphone(phone_number){
        return this.findOne({phone_number:phone_number});
    },

    existid(id_number){
        return this.findOne({id_number:id_number});
    }
})

module.exports = mongoose.model("User", user);