const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const controller = require("../controller/control");
const auth = require("../middleware/auth");

router.use(bodyParser.json());

router.get("/user/register", controller.register);

router.post("/user/register", controller.register, auth.auth);

router.post("/user/login", controller.login);

router.post("/user/forgetpassword", controller.forgetpassword);

module.exports = router;