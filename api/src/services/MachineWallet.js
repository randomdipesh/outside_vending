const MachineWallet = require("../models/MachineWallet")

exports.getOneWallet = async (condition,select = "")=>{
    return await MachineWallet.findOne(condition,select)
}
exports.saveMachineWallet = async (data)=>{
    return await new MachineWallet(data).save()
}
exports.updateMachineWallet = async (condition,data)=>{
    return await MachineWallet.updateOne(condition,data)
}