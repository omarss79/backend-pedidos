const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Por favor, teclea un nombre']
    },
    brand: {
        type:String,
        required: [true, 'Por favor, teclea una marca']
    },
    sku: {
        type:String,
        required: [true, 'Por favor, teclea un SKU']
    },
    price: {
        type:Number,
        required: [true, 'Por favor, teclea un precio']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productsSchema)