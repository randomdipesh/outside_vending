const {Schema, model} = require("mongoose")
const AvailableItems  = Schema({
    itemName : {type : String, unique : true},
    pricePerItem : Number,
    stock : Number,
    date : {type : Date, default : Date.now()}
})
module.exports = model("AvailableItems",AvailableItems)