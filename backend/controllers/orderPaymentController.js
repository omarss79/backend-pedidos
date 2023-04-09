const asyncHandler = require('express-async-handler')
const OrderPayment = require('../models/orderPaidModel')
const ClientOrder = require('../models/orderModel')

const setOrderPayment = asyncHandler( async (req, res) => {
    if(!req.body.importe){
        res.status(400)
        throw new Error('Favor de asignar un importe')
    }
    if(!req.body.metodo_pago){
        res.status(400)
        throw new Error('Favor de asignar un metodo de pago')
    }
    const order = await ClientOrder.find({ client: req.client.id, pagado: false })
    if(order.length === 1){
        const orderPayment = await OrderPayment.find({order: order[0]._id})
        console.log("order: " + order[0].id);
        console.log("orderPayment: " + orderPayment);
        if(orderPayment.length === 0){
            const payment = await OrderPayment.create({
                payment_date: Date(),
                confirmed: false,
                amount: req.body.importe,
                payment_method: req.body.metodo_pago,
                order: order[0]
            })
            const orderPaid = await ClientOrder.findByIdAndUpdate(order[0]._id, {pagado: true}, { new: true })
            const paymentUpdated = {
                orderPaid,
                payment
            }
            console.log("paymentUpdated: " + paymentUpdated);
            res.status(201).json(paymentUpdated)
        }
        else{
            res.status(400)
            throw new Error('Atención, el pago ya existe')
        }
    }
    else{
        res.status(400)
        throw new Error('Atención, el pedido ya esta pagado')
    }
})


const confirmeOrder = asyncHandler( async (req, res) => {   
    const order = await ClientOrder.findById(req.params.order)  
    if(!order){
        res.status(400)
        throw new Error('Atención, el pedido no existe')
    }
    else{
        if(!order.pagado){
            res.status(400)
            throw new Error('Atención, el pedido no se encuentra pagado')
        }
        const orderPayment = await OrderPayment.find({order: order._id, confirmed: false})
        console.log("orderPayment: " + orderPayment);
        if(orderPayment.length === 1){
            const paymentConfirmed = await OrderPayment.findByIdAndUpdate(orderPayment[0]._id, {confirmed: true}, { new: true })
            console.log("paymentConfirmed: " + paymentConfirmed);
            res.status(201).json(paymentConfirmed)
        }
        else{
            res.status(400)
            throw new Error('Atención, el pago ya se encuentra confirmado')
        }
    }
})
const deliveryOrder = asyncHandler( async (req, res) => {   
    const order = await ClientOrder.findById(req.params.order)  
    if(!order){
        res.status(400)
        throw new Error('Atención, el pedido no existe')
    }
    else{
        if(!order.pagado){
            res.status(400)
            throw new Error('Atención, el pedido no se encuentra pagado')
        }
        if(!order.entregado){            
            const orderPayment = await OrderPayment.find({order: order._id, confirmed: true})
            console.log("orderPayment: " + orderPayment[0]);
            if(orderPayment[0].confirmed){
                const orderDelivery = await ClientOrder.findByIdAndUpdate(order._id, {entregado: true}, { new: true })
                console.log("orderDelivery: " + orderDelivery);
                res.status(201).json(orderDelivery)
            }
            else{
                res.status(400)
                throw new Error('Atención, el pedido aun no esta confirmado')
            }
        }
        else{
            res.status(400)
            throw new Error('Atención, el pago ya se encuentra entregado')
        }
    }
})

module.exports = {
    setOrderPayment,
    confirmeOrder,
    deliveryOrder
}