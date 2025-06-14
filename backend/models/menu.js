const mongoose = require("mongoose");

const menuScheme = new mongoose.Schema({
    chef_id:{ type:mongoose.Schema.Types.ObjectId, ref:"User"},
    title:String,
    description:String,
    price:Number,
    date_uploaded:{type:Date, default: Date.now},
    status:{ type:String, enum:['active','inactive'], default: "active"},
    image: { type: String },
});
module.exports = mongoose.model("Menu",menuScheme);