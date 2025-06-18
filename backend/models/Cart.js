const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
    {
      menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      quantity: { type: Number, default: 1 },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Cart",cartSchema);