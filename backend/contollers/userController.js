const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//REGISTER USER
exports.registerUser = async(req,res) => {
    try{
        const { name, email, password, phone, address, role, location } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "User already exists" });
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            phone,
            address,
            role,
            location,
        });
        res.status(201).json({ message: "User registered", user });
    }
    catch(error)
    {
        res.status(500).json({error:`failed to register user`,details:error.message});
    }
};

//LOGIN 
exports.loginUser = async(req,res) => {
    try {
        const {email, password} =req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({error:"User not found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({error:"Invalid credentials"});

        const token = jwt.sign({id:user._id, role:user.role},process.env.JWT_SECRET,{expiresIn: "7d"});
        res.status(200).json({message:"Login successfull!",token,user});
    } catch (error) {
        res.status(500).json({error:"Login failed",details:error.message});
    }
};

