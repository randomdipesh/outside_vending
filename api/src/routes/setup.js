const {Router} = require("express")
const { setup } = require("../controllers/setup")
const router = Router()
router.get("/setup_reset",setup.SetupOrResetApp)
module.exports = router