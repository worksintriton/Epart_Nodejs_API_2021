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

app.use('/auth', auth);
app.use('/buyer_management', buyerManagement);
app.use('/buyer_details', buyerDetails);
app.use('/status', status);
app.use('/country', country);
app.use('/state', state);
app.use('/city', city);
app.use('/payout', payout);
app.use('/currency', currency);
app.use('/productType', productType);
app.use('/reason', reason);
app.use('/userType', usertype);
app.use('/tradingType', tradingtype);


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