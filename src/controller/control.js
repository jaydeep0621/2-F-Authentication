const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const async = require("async");
const i18n = require("i18n");
const user = require("../model/user");
const Appconfig = require("../config/config.json");

module.exports = {

    //Hashing Password
    passwordbcrypt: async(password)=>{
        let pass = bcrypt.hashSync(password, Number(Appconfig.SALT.ROUNDS));
        return(pass);
    },

    //Registering user 
    register: async(req,res,next)=> {
        try{
            res.send("Hello World")
        }catch(err){
            err.resmsg = i18n.__("SOMETHING_WENT_WRONG");
            return next(err);
        }
    },

    //User Login
    login: async(req,res,next)=>{
        try{

        }catch(err){
            err.resmsg = i18n.__("SOMETHING_WENT_WRONG");
            return next(err);
        }
    },

    //forget password
    forgetpassword: async(req,res,next)=>{
        try{

        }catch(err){
            err.resmsg = i18n.__("SOMETHING_WENT_WRONG");
            return next(err);
        }
    }
}