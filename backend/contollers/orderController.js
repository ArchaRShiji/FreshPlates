const Order = require("../models/Orders");
const Menu = require("../models/menu");

exports.createOrder = async( req,res)=>{
    try {
        const {buyer_id, menu_id, quantity, delivery_type} = req.body;

        if(!buyer_id || !menu_id || !quantity){
             return res.status(400).json({ error: "Missing required fields" });
        }
          const menu = await Menu.findById(menu_id);
        if (!menu) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        const total_price = menu.price * quantity;
        const newOrder = await Order.create({
            buyer_id,
            menu_id,
            quantity,
            total_price,
            delivery_type,
        });
        res.status(201).json({message: "Order placed successfully",newOrder,});
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ error: "Failed to create order", details: error.message });
    }
};

exports.getOrders = async(req,res) =>{
    try {
        const {buyer_id} = req.params;
        const allOrders = await Order.find({buyer_id});
        res.status(201).json({message:"retrieved alll orders",allOrders});
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve order", details: error.message });
    }
};