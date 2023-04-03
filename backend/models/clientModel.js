const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea un nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor tecla un email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea un password']
    },
    verificado: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Client', clientSchema)