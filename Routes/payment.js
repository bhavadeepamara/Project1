const express = require('express');
const router = express.Router();

const schedule=require('node-schedule');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "routermsg"
    });
});

router.post("/abndchkout", (req, res) => {
    console.log(req.body.email) 
    res.status(200).json({   
        "email":req.body.email
    });

    const time_one=Date.now()+30*60000
    schedule.scheduleJob('reminder_one',time_one,()=>{
    console.log('Hi '+req.body.customer.first_name+' '+req.body.customer.last_name+'\n------Your payment is left pending -----\nTap on this link to proceed checkout \n'+req.body.abandoned_checkout_url);
    })

    const time_two=Date.now()+24*60*60000
    schedule.scheduleJob('reminder_two',time_two,()=>{
    console.log('Hi '+req.body.customer.first_name+' '+req.body.customer.last_name+'\n------Its been a day Your payment is left pending -----\nTap on this link to proceed checkout \n'+req.body.abandoned_checkout_url);
    })

    const time_three=Date.now()+3*24*60*60000
    schedule.scheduleJob('reminder_three',time_three,()=>{
    console.log('Hi '+req.body.customer.first_name+' '+req.body.customer.last_name+'\n------Its been a 3 days Your payment is left pending -----\nTap on this link to proceed checkout \n'+req.body.abandoned_checkout_url);
    })

 })

 router.post("/order", (req, res) => {
    console.log('Hi '+req.body.order.customer.first_name+' '+req.body.order.customer.last_name+'\nYour paymemt is confirmed on this order id'+req.body.order.id);
    console.log(req.body.order.customer.email) 
    res.status(200).json({  
        'email':req.body.order.customer.email
    });
    
    schedule.cancelJob('reminder_one');
    schedule.cancelJob('reminder_two');
    schedule.cancelJob('reminder_three');
 })

module.exports=router;