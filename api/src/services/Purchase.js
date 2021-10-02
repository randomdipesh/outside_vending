const Purchase = require("../models/Purchase")


exports.savePurchase = async (data)=>{
    return await new Purchase(data).save()
}
exports.getOnePurchase  = async (condition, select = "")=>{
    return await Purchase.findOne(condition,select)
}

exports.updateOnePurchase  = async (condition,data)=>{
    return await Purchase.updateOne(condition,data)
}