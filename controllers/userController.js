const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');


//@desc Register a user
//@route GET api/user/register
//@access public

const registerUser= asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
         res.status(400);
         throw new Error("all fields are mandatory");

    }
    const userAvailable= await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already register");
        }
    //hash password
    const hashedPassword= await bcrypt.hash(password,10);
    console.log("hash password",hashedPassword);

    const user= await User.create({
        username,
        email,
        password:hashedPassword

    });
    console.log(`user created:${user}` );
    if(user)
    {
        res.status(201).json({_id : user.id , email : user.email});
    }else
    {
        res.status(400);
        throw new Error("User data not valid");
    }
    res.json({message:"user register"});
})


//@desc login a user
//@route GET api/user/login
//@access public

const loginUser= asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
    res.status(400);
    throw new Error("All field are Mandatory");
    }
     const user=await User.findOne({email});
     if( user && (await bcrypt.compare(password,user.password)) ){
     const accessToken = jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id: user.id,
        },
        
     },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"30m"}
     )
     
     res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("Email or password are not valid");
    }
})


//@desc current user info
//@route GET api/user/current
//@access private

const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user);
})

module.exports={registerUser,loginUser,currentUser};