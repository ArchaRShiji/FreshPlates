const mongoose = require("mongoose");

const orderScheme = new mongoose.Schema({
    buyer_id:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    menu_id:{type:mongoose.Schema.Types.ObjectId,ref:"Menu"},
    quantity:Number,
    total_price:Number,
    status:{ type:String, enum:["pending", "confirmed", "preparing", "out-for-delivery", "delivered"],default: "pending",},
    delivery_type:{type:String, enum:['pickup','delivery'],default: "pickup"},
    created_at:{type:Date,default:Date.now},
});
module.exports=mongoose.model("Order",orderScheme);