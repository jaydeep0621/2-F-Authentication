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
const morgan = require("morgan");

app.use(morgan("dev"));

// setup some locales - other locales default to the first locale
i18n.configure({
    locales: "en",
    directory: __dirname + "/locales",
    updateFiles: false,
    objectNotation: true
});

app.use(function (req, res, next) {
    i18n.init(req, res);
    next();
});

app.use("/static", express.static(path.join(__dirname, "/public")));

//Secure App by Setting Various HTTPs Header
app.use(helmet());

//Parse Body Params and Attach them to req.body
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cookieparser());

//Cross Origin Resource Sharing
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//Getting IP Address
app.use(requestip.mw());

//including all routes
app.use("/api", routes);

//intialize i18n 
app.use((req, res, next) => {
    i18n.init(req, res);
    return next;
})

//initialize next
app.use((err, req, res, next) => {
    return util.response(
        res,
        {},
        err.resmsg,
        httpstatus.INTERNAL_SERVER_ERROR,
        err.rescode,
    )
})

app.listen(port, () => {
    console.log(`Successfully Conneted at PORT Number : ${port}`);
})