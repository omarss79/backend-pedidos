const mongoose = require('mongoose');

const clientAddressSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Por favor, teclea un nombre']
    },
    address: {
        type:String,
        required: [true, 'Por favor, teclea una direccion']
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Client_Address', clientAddressSchema)