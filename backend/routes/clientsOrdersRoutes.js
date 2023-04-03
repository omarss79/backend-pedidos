const express = require('express')
const router = express.Router()
const {getClientOrders, setClientOrders, updateClientOrders, deleteClientOrders} = require('../controllers/clientOrderController')
const { protectClient } = require('../middlewares/authClientMiddleware')

router.get('/', protectClient, getClientOrders)
router.post('/', protectClient, setClientOrders)
router.put('/:id/:cantidad', protectClient, updateClientOrders)
router.delete('/:id', protectClient, deleteClientOrders)

module.exports = router