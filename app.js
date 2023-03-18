const express=require('express');
const app=express();

const paymentRoutes=require('./Routes/payment');
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use('/payment',paymentRoutes);

  app.use('/',(req,res,next)=>{
    res.status(200).json({
        message:"Hello world4000"
    });
});

module.exports=app;