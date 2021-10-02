const {Router} = require("express")
const { purchase } = require("../controllers/transaction")
const router = Router()
router.get("/purchase",purchase.Purchase)
module.exports = router