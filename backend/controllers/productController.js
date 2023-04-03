const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})
const setProducts = asyncHandler( async (req, res) => {
    if(!req.body.name){
        res.status(400)
        throw new Error('Favor de teclear un nombre')
    }
    if(!req.body.brand){
        res.status(400)
        throw new Error('Favor de teclear una marca')
    }
    if(!req.body.sku){
        res.status(400)
        throw new Error('Favor de teclear un sku')
    }
    if(!req.body.price){
        res.status(400)
        throw new Error('Favor de teclear un precio')
    }
    if(!req.body.category){
        res.status(400)
        throw new Error('Favor de teclear una categoria')
    }
    const product = await Product.create({
        name: req.body.name,
        brand: req.body.brand,
        sku: req.body.sku,
        price: req.body.price,
        category: req.body.category
    })
    res.status(201).json(product)
})
const updateProducts = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(400)
        throw new Error('Producto no encontrado')
    }
    
    const productModificado = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(productModificado)
})
const deleteProducts = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(400)
        throw new Error('Producto no encontrado')
    }

    await product.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getProducts,
    setProducts,
    updateProducts,
    deleteProducts
}