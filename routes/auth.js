var express = require('express');
var router = express.Router();

var customerModel = require('./../models/customer.model');

router.post('/login', async (req,res)=>{
    var loginUser = {
        username: req.body.username,
        password: req.body.password,
    };

    if ((loginUser.username == null || loginUser.username == undefined || loginUser.username =='') || (loginUser.password == null || loginUser.password == undefined || loginUser.password =='')) {
        res.json({ success: false, msg: "Please enter a Username and Password" });
    }else{
        const inputvalue = loginUser.username;
        console.log(inputvalue.match("^[0-9]*$"));
        if(inputvalue.match("^[0-9]*$")){
            let customerExists = await customerModel.findOne({mobile:req.body.username,password:req.body.password});

            if (customerExists) {
                res.json({ success: true, msg:"succesfully logged in", data:customerExists});
            } else {
                res.json({ success: false, msg: "Incorrect username or password" });
            }
        }else{
            let customerExists = await customerModel.findOne({email:req.body.username,password:req.body.password});

            if (customerExists) {
                res.json({ success: true, msg:"succesfully logged in", data:customerExists});
            } else {
                res.json({ success: false, msg: "Incorrect username or password" });
            }
        }
    }
});

module.exports = router;