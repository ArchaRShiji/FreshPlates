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

exports.getMenu = async (req, res) => {
  const { chef_id } = req.params;
  try {
    const filter = chef_id ? { chef_id } : {};
    const meals = await Menu.find(filter);
    res.json({ meals });
  } catch (err) {
    res.status(500).json({ error: "Error fetching menu" });
  }
};

// Get menu by ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate("chef_id", "name");
    if (!menu) return res.status(404).json({ error: "Menu not found" });
    res.status(200).json({ menu });
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu", details: error.message });
  }
};
// Update menu
exports.updateMenu = async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Menu updated", updatedMenu });
  } catch (error) {
    res.status(500).json({ error: "Error updating menu", details: error.message });
  }
};
// Delete menu
exports.deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Menu deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting menu", details: error.message });
  }
};