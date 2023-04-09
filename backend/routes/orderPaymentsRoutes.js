const express = require('express')
const router = express.Router()
const { setOrderPayment, confirmeOrder, deliveryOrder } = require('../controllers/orderPaymentController')
const { protectClient } = require('../middlewares/authClientMiddleware')

router.post('/', protectClient, setOrderPayment)
router.put('/confirme/:order', protectClient, confirmeOrder)
router.get('/delivery/:order', protectClient, deliveryOrder)

module.exports = router