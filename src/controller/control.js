const bodyParser = require("body-parser");
const async = require("async");
const i18n = require("i18n");

module.exports = {

    //register check using get function
    register: async(req,res,next)=> {
        try{
            res.send("Hello World");  
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