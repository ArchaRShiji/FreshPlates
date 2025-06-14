const express = require("express");
const router = express.Router();
const userController = require("../contollers/userController");
const menuController = require("../contollers/menuController")
const upload = require("../middleware/upload");

router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);

router.post("/create-menu",upload.single("image"),menuController.createMenu);

module.exports = router;