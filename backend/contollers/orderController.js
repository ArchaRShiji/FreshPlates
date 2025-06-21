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

exports.getChefOrders = async (req, res) => {
  try {
    const { chef_id } = req.params;
    const orders = await Order.find()
      .populate({
        path: "menu_id",
        match: { chef_id }, // filter only menus by this chef
      })
      .populate("buyer_id");

    // filter out orders where menu_id was null due to mismatch
    const filteredOrders = orders.filter(order => order.menu_id !== null);

    res.status(200).json({ orders: filteredOrders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chef's orders", details: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json({ message: "Status updated", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to update status", details: error.message });
  }
};