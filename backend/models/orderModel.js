const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    fecha: {
        type:Date,
        required: [true, 'Por favor, asigna una fecha']
    },
    pagado: {
        type:Boolean,
        required: [true, 'Por favor, asigna el estatus de pagado']
    },
    guia: {
        type:String,
        required: [true, 'Por favor, teclea una guia']
    },
    paqueteria: {
        type:String,
        required: [true, 'Por favor, teclea una direccion']
    },
    entregado: {
        type:Boolean,
        required: [true, 'Por favor, asigna el estatus de entregado']
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)