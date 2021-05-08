const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs')
const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const auth = require('./routes/auth');
const buyerManagement = require('./routes/buyer_management');
const buyerDetails = require('./routes/buyerDetails');
const status = require('./routes/status');
const country = require('./routes/country');
const state = require('./routes/state');
const city = require('./routes/city');
const payout = require('./routes/payout-schdule');
const currency = require('./routes/currency');
const productType = require('./routes/product-type');
const reason = require('./routes/reason');
const usertype = require('./routes/user_type');
const tradingtype = require('./routes/tradingType');

app.use('/api/auth', auth);
app.use('/api/buyer_management', buyerManagement);
app.use('/api/buyer_details', buyerDetails);
app.use('/api/status-management', status);
app.use('/api/country-management', country);
app.use('/api/state-management', state);
app.use('/api/city-management', city);
app.use('/api/payout-management', payout);
app.use('/api/currency-management', currency);
app.use('/api/productType-management', productType);
app.use('/api/reason-management', reason);
app.use('/api/userType-management', usertype);
app.use('/api/tradingType-management', tradingtype);


server.listen(port,function(err){
    if(err) 
    console.log("Server Startup Error: "+err);
    else
    console.log("Server running @port: "+port);
});

app.get('/',function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    const sendpage = fs.createReadStream(__dirname + '/index.html','utf8');
    sendpage.pipe(res);
});