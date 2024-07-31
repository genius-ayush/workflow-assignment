import {Router , Request , Response} from 'express' ; 
import jwt from 'jsonwebtoken' ; 
import {User} from "../db" ; 
import { SECRET, authenticateJwt } from '../middleware';
const router = Router() ; 

router.post('/signup' , async(req , res)=>{
    const {username , email , password} = req.body ; 
    const user = await User.findOne({email}) ; 

    if(user){
        res.status(403).json({message:'User already exist'})
    }else{
        const newUser = new User({username , email , password}) ; 
        await newUser.save() ; 
        const token = jwt.sign({id : newUser._id} , SECRET , {expiresIn:'1h'});
        res.json({message: 'User created successfully' , token});

    }
})

router.post('/login' , async(req , res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email , password}); 

    if(user){
        const token = jwt.sign({id: user._id} , SECRET , {expiresIn:'1h'});
        res.json({message:'logged in Successfully' , token});
    }else{
        res.status(403).json({message : 'Invalid email or password'});
    }
})

router.get('/me' , authenticateJwt , async(req , res)=>{
    const userId = req.headers["userId"]; 
    const user = await User.findOne({_id:userId}) ;
    if(user){
        res.json({username : user.userName}) ; 
    }else{
        res.status(403).json({message:'User not logged in'}); 
    }
})

router.post('/logout' , authenticateJwt , (req , res)=>{
    res.json({message: 'logged out sucessfully'});
})

export default router ; 