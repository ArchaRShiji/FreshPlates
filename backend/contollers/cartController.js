const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const { user_id } = req.params;
    const cart = await Cart.findOne({ user_id }).populate("items.menu_id");
    res.status(200).json(cart || { user_id, items: [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cart", details: error.message });
  }
};


exports.addCart = async (req, res) => {
  try {
    const { user_id, menu_id, quantity } = req.body;

    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = new Cart({ user_id, items: [{ menu_id, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.menu_id.toString() === menu_id);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ menu_id, quantity });
      }
    }

    await cart.save();
    res.status(201).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart", details: error.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { user_id, menu_id } = req.body;
    const cart = await Cart.findOne({ user_id });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(item => item.menu_id.toString() !== menu_id);
    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item", details: error.message });
  }
};

