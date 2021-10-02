const {Schema, model} = require("mongoose")
const Purchase  = Schema({
    itemName : String,
    itemsPurchased : Number,
    totalAmount : Number,
    date : {type : Date, default : Date.now()}
})
module.exports = model("Purchase",Purchase)