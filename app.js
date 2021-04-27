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
const buyerManagement = require('./routes/buyerMangement');
const buyerDetails = require('./routes/buyerDetails');
const status = require('./routes/status');
const country = require('./routes/country');
const state = require('./routes/state');
const city = require('./routes/city');
const payout = require('./routes/payout-schdule');
const currency = require('./routes/currency')

app.use('/auth', auth);
app.use('/buyer_management', buyerManagement);
app.use('/buyer_details', buyerDetails);
app.use('/status', status);
app.use('/country', country);
app.use('/state', state);
app.use('/city', city);
app.use('/payout', payout);
app.use('/currency', currency);

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