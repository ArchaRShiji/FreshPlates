const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    name:String,
    email:{type:String, required:true,  unique: true},
    password:String,
    phone:String,
    address:String,
    role:{type:String,enum:['admin','chef','user'],default: "user" },
    location:{
        lat:Number,
        lng:Number,
    },
    created_at:{type:Date, default:Date.now},
    isApproved: { type: Boolean, default: false },
});
module.exports = mongoose.model("User",userScheme);