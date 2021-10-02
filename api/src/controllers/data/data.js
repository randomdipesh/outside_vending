const {defaultItems} = require("../../../default_data.json")
const { successReponse } = require("../../common/responseType")
exports.getItems = async (req,res)=>{
    let items = defaultItems
    for (let item of Object.values(items)){
        delete item.stock
    }
    res.json({
        type : successReponse,
        items
    })
}