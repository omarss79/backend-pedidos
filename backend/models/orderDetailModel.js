const mongoose = require('mongoose');

const orderDetailSchema = mongoose.Schema({
    quantity: {
        type:Number,
        required: [true, 'Por favor, teclea una cantidad']
    },
    price: {
        type:Number,
        required: [true, 'Por favor, teclea un precio']
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order_Detail', orderDetailSchema)