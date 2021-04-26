const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const session = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.ObjectId, ref:'User'
    },
    token:{
        type:String
    },
    ip_address:{
        type: String
    },
    is_login:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

session.static({

    removesession(sessionobj){
        return this.updateMany(sessionobj, {$set: {is_login:0}},{multi:true})
    },

    checksession(sessionobj){
        return this.find({
            user_id : ObjectId(sessionobj.user_id),
            is_login:1
        })
    }
})

module.exports = mongoose.model('Session', session);