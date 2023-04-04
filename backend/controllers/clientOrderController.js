const asyncHandler = require('express-async-handler')
const ClientOrder = require('../models/orderModel')
const ClientOrderDetails = require('../models/orderDetailModel')
const Product = require('../models/productModel')

const getClientOrders = asyncHandler( async (req, res) => {
    let order = await ClientOrder.find({ client: req.client.id, pagado: false })
    let details = ""
    if(order.length > 0){
        order = order[0]
        details = await ClientOrderDetails.find({ order: order._id })
        order.details = details
        console.log("Agrego orden: " + order)
        console.log("Agrego detalles: " + order.details)
    } else order = order[0]
    let clientOrder = {
        order: order,
        details: details
    }
    res.status(200).json(clientOrder)
})
const setClientOrders = asyncHandler( async (req, res) => {
    let order = await ClientOrder.find({ client: req.client.id, pagado: false })
    let details = ""
    if(order.length === 0){
        if(!req.body.guia){
            res.status(400)
            throw new Error('Favor de teclear una guía')
        }
        if(!req.body.paqueteria){
            res.status(400)
            throw new Error('Favor de teclear una paqueteria')
        }
        order = await ClientOrder.create({
            fecha: Date(),
            pagado: false,
            entregado: false,
            guia: req.body.guia,
            paqueteria: req.body.paqueteria,
            client: req.client
        })
    }
    if(!req.body.cantidad){
        res.status(400)
        throw new Error('Favor de teclear una cantidad')
    }
    if(!req.body.product_id){
        res.status(400)
        throw new Error('Favor de seleccionar el producto')
    }
    product = await ClientOrderDetails.find({ order: order[0]._id, product: req.body.product_id })
    if(product.length > 0){
        let quantity = Number(product[0].quantity) + Number(req.body.cantidad)
        details = await ClientOrderDetails.findByIdAndUpdate(product[0]._id, {quantity: quantity}, { new: true })
    }
    else{
        const product_item = await Product.findById(req.body.product_id)
        details = await ClientOrderDetails.create({
            quantity: req.body.cantidad,
            price: product_item.price,
            order: order[0]._id,
            product: req.body.product_id
        })
    }

    let clientOrder = {
        order: order[0],
        detail: details
    }
    res.status(201).json(clientOrder)
})

const updateClientOrders = asyncHandler( async (req, res) => {
    let order = await ClientOrder.find({ client: req.client.id, pagado: false })
    let details = ""
    if(order.length === 0){
        res.status(400)
        throw new Error('Error, el usuario no tiene un pedido registrado')
    }
    if(!req.params.cantidad){
        res.status(400)
        throw new Error('Favor de teclear la cantidad del producto')
    }
    if(!req.params.id){
        res.status(400)
        throw new Error('Favor de teclear el id del producto')
    }
    // Verificamos que la tarea pertenece al usuario del token
    if (order[0].client.toString() !== req.client.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado, la dirección no pertenece al cliente logueado')
    }
    detail = await ClientOrderDetails.findById(req.params.id)
    if(detail){
        let quantity = Number(req.params.cantidad)
        details = await ClientOrderDetails.findByIdAndUpdate(detail._id, {quantity: quantity}, { new: true })
    }
    else{
        res.status(400)
        throw new Error('Error, el producto ya no existe en el pedido')
    }  
    let clientOrder = {
        order: order[0],
        detail: details
    }
    console.log(clientOrder);
    res.status(200).json(clientOrder)
})

const deleteClientOrders = asyncHandler( async (req, res) => {
    let order = await ClientOrder.find({ client: req.client.id, pagado: false })
    if(order.length === 0){
        res.status(400)
        throw new Error('Error, el usuario no tiene un pedido registrado')
    }
    if(!req.params.id){
        res.status(400)
        throw new Error('Favor de teclear el id del detalle')
    }
    //Verificamos que la tarea pertenece al usuario del token
    if (order[0].client.toString() !== req.client.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado, la dirección no pertenece al cliente logueado')
    }
    detail = await ClientOrderDetails.findById(req.params.id)
    console.log("detail: " + detail);
    if(detail){
        await detail.deleteOne()
        res.status(200).json({ id: req.params.id })
    }
    else{
        res.status(400)
        throw new Error('Error, el producto ya no existe en el pedido')
    }

})

module.exports = {
    getClientOrders,
    setClientOrders,
    updateClientOrders,
    deleteClientOrders
}