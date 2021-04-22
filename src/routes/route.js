const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const controller = require("../controller/control");
const auth = require("../middleware/auth");

router.use(bodyParser.json());

router.get("/register", controller.register);

router.post("/register", controller.register, auth.auth);

router.post("/login", controller.login);

router.post("/forgetpassword", controller.forgetpassword);

module.exports = router;