const mongoose = require("mongoose"); 

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected");
    }catch(error){
        console.log(`Failed to connect to MongoDb`,error);
        process.exit(1);
    }
}
module.exports=connectDB;