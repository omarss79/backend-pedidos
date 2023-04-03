const mongoose = require('mongoose');

const orderPaidSchema = mongoose.Schema({
    payment_date: {
        type:Date,
        required: [true, 'Por favor, asigna una fecha de pago']
    },
    confirmed: {
        type:Boolean,
        required: [true, 'Por favor, asigna el estatus del pedido']
    },
    amount: {
        type:Number,
        required: [true, 'Por favor, asigna el importe pagado']
    },
    payment_method: {
        type:String,
        required: [true, 'Por favor, asigna el metodo de pago']
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order_Paid', orderPaidSchema)