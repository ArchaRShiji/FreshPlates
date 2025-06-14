const Menu = require("../models/menu");
const User = require("../models/User");

exports.createMenu = async (req, res) => {
  try {
    const { title, description, price, chef_id } = req.body;

    // 1. Validate chef
    const chef = await User.findById(chef_id);
    if (!chef || chef.role !== "chef" || !chef.isApproved) {
      return res.status(403).json({ error: "Only approved chefs can upload menus" });
    }

    // 2. Create menu with image (if uploaded)
    const menu = await Menu.create({
      chef_id,
      title,
      description,
      price,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({ message: "Menu created successfully", menu });
  } catch (error) {
    console.error("Menu creation error:", error);
    res.status(500).json({ error: "Menu creation failed", details: error.message });
  }
};
