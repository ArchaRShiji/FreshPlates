const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));//?

connectDB();

const apiRoutes = require("./routes/userRoutes");
app.use("/api",apiRoutes);

const PORT = process.env.PORT||8500;
app.listen(PORT,()=>{
    console.log(`Server is listening on port${process.env.PORT}`);
});