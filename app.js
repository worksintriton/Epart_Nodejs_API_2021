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
const buyerManagement = require('./routes/buyerManagement');
const buyerDetails = require('./routes/buyerDetails');

app.use('/auth', auth);
app.use('/buyer_management', buyerManagement);
app.use('/buyer_details', buyerDetails);

app.get('/',function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    const sendpage = fs.createReadStream(__dirname + '/index.html','utf8');
    sendpage.pipe(res);
});