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
const cars = require('./routes/cars');
const groupManagement = require('./routes/group_management');
const subGroupManagement = require('./routes/subgroup_management');
const subNodeManagement = require('./routes/subNode_management');
const partsManagement = require('./routes/parts_management');
const commissionManagement = require('./routes/commission_management');
const orderManagement = require('./routes/order_management');
const paymentManagement = require('./routes/payment_management');
const categoryRequestManagement = require('./routes/categoryRequest_management');
const buyerSaveQuotes = require('./routes/buyerSaved_quotes');
const newsLetterManagement = require('./routes/newsletter_management');
const notificationManagement = require('./routes/notification_management');
const ratingReview = require('./routes/ratingReviews');
const partsRequest = require('./routes/parts_request_outOfStock');

const makeOfferManagement = require('./routes/makeOffer_management');
const auditTrail = require('./routes/audit_trail');
const staticPage = require('./routes/static_pages');
const subscription = require('./routes/subscription_management');
const roles = require('./routes/roles');
const adminUser = require('./routes/admin_user');
const adminRole = require('./routes/adminRole')
const adminNotification = require('./routes/admin_notification')
const appUser = require('./routes/app_users')

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
app.use('/cars', cars);
app.use('/group_management', groupManagement);
app.use('/sub_group_management', subGroupManagement);
app.use('/subNode_management', subNodeManagement);
app.use('/parts_management', partsManagement);
app.use('/commission_management', commissionManagement);
app.use('/order_management', orderManagement);
app.use('/payment_management', paymentManagement);
app.use('/category_request_management', categoryRequestManagement);
app.use('/buyer_save_quotes', buyerSaveQuotes);
app.use('/newsletter_management', newsLetterManagement);
app.use('/notification_management', notificationManagement);
app.use('/rating_review', ratingReview);
app.use('/parts_request_outOfStock', partsRequest);
app.use('/make_offer_management', makeOfferManagement);
app.use('/audit_trail', auditTrail);
app.use('/static_page', staticPage);
app.use('/roles', roles);
app.use('/subscription', subscription);
app.use('/adminUser', adminUser);
app.use('/adminRole', adminRole);
app.use('/adminNotification', adminNotification);
app.use('/appUser', appUser);

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