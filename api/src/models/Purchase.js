const {Schema, model} = require("mongoose")
const Purchase  = Schema({
    itemName : String,
    purchaseToken : String,
    itemsPurchased : Number,
    totalAmount : Number,
    isRefunded : {type : Boolean, default : false},
    date : {type : Date, default : Date.now()}
})
module.exports = model("Purchase",Purchase)