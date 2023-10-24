const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const Product = require('./db/product');
const product = require('./db/product'); 
const Jwt = require('jsonwebtoken');
const app = express();
const jwtKey = 'e-commerce';
//middle ware
app.use(express.json());
app.use(cors());

function verifyToken(req,res,next){
    let token = req.headers.authorization;
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token,jwtKey,(err,valid)=>{
                if(err)
                    res.status(401).send({result:'please provide a valid token'});
                else
                    next();
        })
    }
    else{
        res.status(403).send({reslut:'please provide token'})
    }
   
}

app.get('/',(req,res)=>{
    res.send("working");
})
app.get('/products',verifyToken , async (req,res)=>{
    let result = await Product.find();
    if(result.length > 0)
        res.send(result);
    else
        res.send({result:'No products found'})
})
app.get('/product/:id',verifyToken , async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result) res.send(result);
    else res.send({result:'no result found'})
})
app.get('/search/:key', verifyToken ,async (req,res)=>{
    let result = await Product.find({
        '$or':[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {price:{$regex:req.params.key}}
        ]
    })
    res.send(result);
})
app.post('/signup',async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    if(result){
        Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
            if(err)
                res.send({result:'something went wrong, please try after sometime'});
            else
                res.send({result, auth:token})
        })
    }
})
app.post('/login',async (req,res)=>{
    if(req.body.email && req.body.password){
        const user = await User.findOne(req.body).select('-password');
        if(user){
            Jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
                if(err)
                    res.send({result:'something went wrong, please try after sometime'});
                else
                    res.send({user, auth:token})
            })
        }
        else
        res.send({result:"no user found"})
    }
    else{
        res.send({result:"no user found"})
    }
    
})

app.post('/add',verifyToken ,async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.put('/product/:id',verifyToken , async (req,res)=>{
    const result = await product.updateOne(
        {_id:req.params.id}, //where to update
        {$set:req.body }) //updated value
    res.send(result)

})
app.delete('/product/:id',verifyToken , async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id}) 
    res.send(result)
})

app.listen(5000,(req,res)=>{
    console.log("server started at port 5000");
})