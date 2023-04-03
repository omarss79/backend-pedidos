const express = require('express')
const router = express.Router()
const { registerClient, loginClient, getMisDatos } = require('../controllers/clientController')
const { protectClient } = require('../middlewares/authClientMiddleware')

router.post('/register', registerClient)
router.post('/login', loginClient)
router.get('/mis-datos', protectClient, getMisDatos)

module.exports = router