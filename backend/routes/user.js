//import { z } from '../zod'

const {JWT_SECRET} = require('../config')
const z = require('zod')
const {usermodel} = require('../db');
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();

const schema = z.object({

    username:z.string().email(),
    lastname:z.string(),
    password:z.string(),

});
const LoginSchema = z.object({

    username:z.string().email(),
    password:z.string(),

});


router.get('/',(req,res)=>{
    console.log("Inside the user");
    res.send("inside the app");
    return res.status(200)
});

router.post('/signup',async (req,res)=>{
    console.log('Sign up');
    /**const username = req.body.username;
    const passwd = req.body.password;
    const lastname = req.body.lastname;**/

 /**
  *     const firstname = req.body.firstname;
    if (!username || !passwd || !lastname || !lastname || !firstname ){
        res.sendStatus(400);
    }
  */
    const user_data = {
        "email":req.body.email,
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "username":req.body.username,
        "password":req.body.password,

    }


    const validation = schema.safeParse(user_data);
    const existingUser = await usermodel.findOne({
        username: req.body.username
    })
    console.log(validation)
    if(! validation.success)
    {
        //res.sendStatus(400);
        return res.status(400).json({message:"Validation Unsuccessfull"})
    }
    //const email = req.body.email;
    //const user =  usermodel.
    
    if (existingUser){
       return res.status(411).json({message:"user alreday exists"});
    }

    const p = new usermodel(user_data);
    await p.save();
    const userId = p._id;
    console.log("Id: "+userId)
    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    return res.status(200).json({message:"user Created with Id: "+userId,
            Token:token
        });
})

router.post('/signin',async(req,res)=>{
    const body = {
        username:req.body.username,
        password:req.body.password,
    };
    
    const username = req.body.username;

    const fetched_user = await usermodel.findOne({'username':username});
    const validation = LoginSchema.safeParse(body);

    if(!validation.success)
    {
        return res.status(411).json({message:"Invalid Body"});
    }

    if(!fetched_user)
    {
        return res.status(404).json({message:"User Not Found"});
    }
    const user_id = fetched_user._id;
    const token = jwt.sign({user_id},JWT_SECRET); 
    if(!token)
    {
        return res.status(411).json({message:"Error While Logging In"});
    }

    return res.status(200).json({token:token});
    

})


module.exports = router;