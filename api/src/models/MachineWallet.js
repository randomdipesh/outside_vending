const {Schema, model} = require("mongoose")
const MachineWallet  = Schema({
    amount : Number,
    date : {type : Date, default : Date.now()}
})
module.exports = model("MachineWallet",MachineWallet)