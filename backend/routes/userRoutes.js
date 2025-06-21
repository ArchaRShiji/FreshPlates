const express = require("express");
const router = express.Router();
const userController = require("../contollers/userController");
const menuController = require("../contollers/menuController")
const upload = require("../middleware/upload");
const orderController = require("../contollers/orderController");
const cartController = require("../contollers/cartController");

router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);

router.post("/create-menu",upload.single("image"),menuController.createMenu);
router.get("/get-menu",menuController.getMenu);

router.post("/create-order",orderController.createOrder);
router.get("/getOrders/:buyer_id",orderController.getOrders);

router.post("/add-cart",cartController.addCart);
router.get("/get-cart/:user_id", cartController.getCart);
router.delete("/delete-cart-item",cartController.deleteCartItem);

module.exports = router;