const express = require('express')
const router = express.Router()
const {getClientAddress, setClientAddress, updateClientAddress, deleteClientAddress} = require('../controllers/clientAddressController')
const { protectClient } = require('../middlewares/authClientMiddleware')

router.get('/', protectClient, getClientAddress)
router.post('/', protectClient, setClientAddress)
router.put('/:id', protectClient, updateClientAddress)
router.delete('/:id', protectClient, deleteClientAddress)

module.exports = router