var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var customerSchema = new Schema({  
    email: String,
    mobile: String,
    name: String,
    password: String,
    role: String,
    status: Boolean,
    latitude: Number,
    longitude: Number,
    login_status: String
});

customerSchema.plugin(timestamps);
mongoose.model('customerModel', customerSchema);
module.exports = mongoose.model('customerModel');