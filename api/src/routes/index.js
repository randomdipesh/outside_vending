const {Router} = require("express")
const router = Router()
const setup = require("./setup")
const data = require("./data")
const transaction = require("./transaction")
router.use("/setup",setup)
router.use("/data",data)
router.use("/transaction",transaction)
module.exports = router