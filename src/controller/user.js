const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const async = require("async");
const i18n = require("i18n");
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const session = require("../model/session");
const Appconfig = require("../config/config.json");
const util = require("../utility/response");
const httpstatus = require("../exception/httpstatus.json")


module.exports = {

    //Hashing Password
    passwordbcrypt: async (password) => {
        let pass = bcrypt.hashSync(password, Number(Appconfig.SALT.ROUNDS));
        return (pass);
    },

    //Registering user 
    register: async (req, res, next) => {
        try {
            const User = new user(req.body);
            const getmailresponse = await user.existemail(User.email);
            const getphoneresponse = await user.existphone(User.phone_number);
            const getidresponse = await user.existid(User.id_number);

            if (getmailresponse) {
                const err = {};
                err.resmsg = i18n.__("EMAIL_ID_ALREADY_EXIST")
                err.rescode = i18n.__("responsestatus.ERROR")
                return next(err);
            }

            if (getphoneresponse) {
                const err = {};
                err.resmsg = i18n.__("PHONE_NUMBER_ALREADY_EXIST")
                err.rescode = i18n.__("reponsestatus.ERROR")
                return next(err);
            }

            if (getidresponse) {
                const err = {};
                err.resmsg = i18n.__("ID_NUMBER_ALREADY_EXIST")
                err.rescode = i18n.__("reponsestatus.ERROR")
                return next(err);
            }

            User["password"] = await module.exports.passwordbcrypt(User["password"]);
            let registeruser = await User.save();
            registeruser = registeruser.toObject();
            delete registeruser["password"];

            let token = jwt.sign({
                id: registeruser["_id"],
                email: registeruser["email"],
                name: registeruser["name"],
            }, Appconfig.JWTSECRET);

            const sessionobj = new session();
            sessionobj.user = registeruser["_id"];
            sessionobj.token = token;
            sessionobj.is_login = true;
            await sessionobj.save();

            return util.response(res,
                registeruser,
                i18n.__("USER_SUCCESSFULLY_REGISTERED"),
                httpstatus.OK,
                {},
                i18n.__("responsestatus.Success"),
            );

        }
        catch (err) {
            err.resmsg = i18n.__("SOMETHING_WENT_WRONG");
            err.rescode = i18n.__("responsestatus.ERROR");
            return next(err);
        }
    },

    //User Login
    login: async (req, res, next) => {
        const data = new user(req.body);
        data["email"] = req.body.email.trim();
        user.findOne({ email: data["email"].trim() }, async (err, User) => {
            if (!User) {
                const err = {};
                err.resmsg = i18n.__("USER_DOES_NOT_EXIST");
                err.rescode = i18n.__("responsestatus.ERROR");
                return next(err);
            }
            if (err) {
                const err = {};
                err.resmsg = i18n.__("SOMETHING_WENT_WRONG");
                err.rescode = i18n.__("responsestatus.ERROR");
                return next(err);
            }
            bcrypt.compare(data.password, User["password"], async (err, compare) => {
                if (err) {
                    const err = {};
                    err.resmsg = i18n.__("EMAIL_ID_OR_PASSWORD_DOESNOT_MATCH");
                    err.rescode = i18n.__("responsestatus.ERROR");
                    return next(err);
                }
                try {
                    const userSession = {
                        user_Id: User._id.toString()
                    }
                    const login = await session.checksession(userSession);
                    if (login.length) {
                        await session.removesession();
                    }

                    let token = jwt.sign({
                        id: User["_id"],
                        email: User["email"],
                        name: User["name"],
                    }, Appconfig.JWTSECRET);

                    User = User.toObject();
                    const sessionobj = new session();
                    sessionobj.user = User["_id"];
                    sessionobj.token = token;
                    sessionobj.is_login = true;

                    await sessionobj.save();

                    return util.response(res,
                        User,
                        i18n.__("SUCCESSFULLY_LOGIN"),
                        httpstatus.OK,
                        {},
                        i18n.__("responsestatus.Success")
                    )
                }
                catch (err) {
                    console.log(err);
                    err.resmsg = i18n.__("SOMETHING_WENT_WRONG");
                    err.rescode = i18n.__("responsestatus.ERROR");
                    return next(err);
                }
            });
        });
    },

    //forget password
    forgetpassword: async (req, res, next) => {
        try {

        } catch (err) {
            err.resmsg = i18n.__("SOMETHING_WENT_WRONG");
            return next(err);
        }
    }
}