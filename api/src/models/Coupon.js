const {Schema, model} = require("mongoose")
const Coupon  = Schema({
    code : String,
    amount : Number,
    isUsed : {type : Boolean, default : false},
    usedOn : Date,
    date : {type : Date, default : Date.now()}
})
module.exports = model("Coupon",Coupon)