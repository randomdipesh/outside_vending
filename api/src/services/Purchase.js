const Purchase = require("../models/Purchase")


exports.savePurchase = async (data)=>{
    return await new Purchase(data).save()
}