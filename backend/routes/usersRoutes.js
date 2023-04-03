const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMisDatos } = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/mis-datos', protect, getMisDatos)

module.exports = router