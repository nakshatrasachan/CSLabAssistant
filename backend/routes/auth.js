const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const User = require('../models/User');
router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    try{
        const FoundUser = await User.findOne({username});
        if(FoundUser){
            const ValidUser = await bcrypt.compare(password,FoundUser.password);
            if(!ValidUser){
                console.log('Username or password is incorrect');
                return res.status(400).json({message: "Username or Password is incorrect"})
            }
            console.log("User is valid")
            const token = jwt.sign({ userId: FoundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
            // res.status(200).json({message:"User Found"});
        }
        else{
            console.log("No User Found");
            return res.status(400).json({message:"No User Found"});
        }
        
    }
    catch(e){
        console.log("Login Internal Error",e);
        res.status(400).json({message:"Internal Error in Logging In"});
    }
    

})
router.post('/signup',async(req,res)=>{
    const {username,password} = req.body;
    try{
        const ExistUser = await User.findOne({username});
        if(ExistUser){
            console.log("User Already exists");
            res.status(400).json({message:"User Already exists"});
        }
        else{
            const hash = await bcrypt.hash(password,12);
            const newuser = new User({username,password: hash});
            await newuser.save();
            const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log(newuser._id);
            return res.json({ token });
            // res.status(201).json({message:"User Registered Successfully"});
        }
    }
    catch(e){
        console.log("Sign Up Internal Error");
        res.status(400).json({message:"Internal Error in SignUp"});
    }
    
    
})
module.exports = router;