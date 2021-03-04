const express = require('express');
const http = require('http');
const mongoose = require('mongoose'); 
const dbURI = "mongodb+srv://Mahes:9962724891@cluster0.slegc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs')
const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const auth = require('./routes/auth');


app.use('/auth', auth);


mongoose.connect(dbURI,{ useNewUrlParser:true,useUnifiedTopology:true }).then((result)=>{
    console.log("Database Connected Successfully");
    server.listen(port,function(err){
        if(err) 
        console.log("Server Startup Error: "+err);
        else
        console.log("Server running @port: "+port);
    });
}).catch(err=>{
    console.log("Error in database connection: "+err);
});



app.get('/',function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    const sendpage = fs.createReadStream(__dirname + '/index.html','utf8');
    sendpage.pipe(res);
});