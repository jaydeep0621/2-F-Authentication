const jwt = require("jsonwebtoken");
const i18n = require("i18n");
const Appconfig = require("../config/config.json");

module.exports = {

    async auth(req,res,next) {
        try{
            const token = req.headers.authorization.split("")[1];
            const decoded = jwt.verify(token, Appconfig.JWTSECRET);
            req.user = decoded;
            next();
        }catch(err){
            err.resmsg = i18n.__("UNAUTHORIZED_USER");
            return next(err);
        }
    }
}