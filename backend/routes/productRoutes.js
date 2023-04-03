const express = require('express')
const router = express.Router()
const {getProducts, setProducts, updateProducts, deleteProducts} = require('../controllers/productController')
const { protect } = require('../middlewares/authMiddleware')

router.get('/', protect, getProducts)
router.post('/', protect, setProducts)
router.put('/:product_id/:cantidad', protect, updateProducts)
router.delete('/:id', protect, deleteProducts)

module.exports = router