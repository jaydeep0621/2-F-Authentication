const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const cookieparser = require("cookie-parser")
const routes = require("./src/routes/route");
const i18n = require("i18n");
const requestip = require("request-ip");
const util = require("./src/utility/response");
require("./src/config/db");
const httpstatus = require("./src/exception/httpstatus.json")

const app = express();
const port = process.env.PORT;

//Secure App by Setting Various HTTPs Header
//app.use(helmet());

//Parse Body Params and Attach them to req.body
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(cookieparser());

//Cross Origin Resource Sharing
app.use(cors());

//Getting IP Address
app.use(requestip.mw());

//including all routes
app.use("/", routes);

i18n.configure({
    locales:"en",
    directory:__dirname+"/src/locales"
})

//intialize i18n 
app.use((req,res,next)=>{
    i18n.init(req,res);
    return next;
})

//initialize next
app.use((err,req,res,next)=>{
    return util.response(res,
        {},
        err.resmsg,
        httpstatus.INTERNAL_SERVER_ERROR,
        err.rescode,
    )
})

app.listen(port, ()=>{
    console.log(`Successfully Conneted at PORT Number : ${port}`);
})