const { errorResponse } = require("../../common/responseType")
const { PurchaseValidation } = require("../../validations/purchase")

exports.Purchase = async (req,res)=>{
    let {itemName, amountToPurchase, cashEntered} = req.body
    let validatePurchase = PurchaseValidation({itemName,amountToPurchase,cashEntered})
    if(validatePurchase.type === errorResponse){
        res.json(validatePurchase)
    }
    else{
        //everything has been validated well
        //proceed with purchase
        
        //check if we have enough item on stock

        

        //check what coin we  have available, so we can calculate return changes
        
    }
}