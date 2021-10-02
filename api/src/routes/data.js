const {Router} = require("express")
const { data } = require("../controllers/data")
const router = Router()
router.get("/items",data.getItems)
module.exports = router