const {Router} = require("express")
const { purchase } = require("../controllers/transaction")
const router = Router()
router.post("/purchase",purchase.Purchase)
router.get("/refund/:purchaseToken",purchase.Refund)
module.exports = router