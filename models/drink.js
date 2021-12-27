var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drinkSchema = new Schema({
    name: String,
    price: Number,
    amount: Number
});

module.exports = mongoose.model('drink', drinkSchema);