const asyncHandler = require('express-async-handler')
const ClientAddress = require('../models/clientAddressModel')

const getClientAddress = asyncHandler( async (req, res) => {
    const address = await ClientAddress.find({ client: req.client.id })
    res.status(200).json(address)
})
const setClientAddress = asyncHandler( async (req, res) => {
    if(!req.body.name){
        res.status(400)
        throw new Error('Favor de teclear un nombre')
    }
    if(!req.body.address){
        res.status(400)
        throw new Error('Favor de teclear una dirección')
    }
    //console.log(req);
    if(!req.client){
        res.status(400)
        throw new Error('Favor de asignar un cliente')
    }
    const address = await ClientAddress.create({
        name: req.body.name,
        address: req.body.address,
        client: req.client
    })
    res.status(201).json(address)
})
const updateClientAddress = asyncHandler( async (req, res) => {
    // console.log(req.params.id);
    const address = await ClientAddress.findById(req.params.id)
    // console.log(address);
    // console.log("Entro 0");
    if(!address){
        res.status(400)
        throw new Error('Direccion no encontrada')
    }
    // console.log("Entro 1");
    // console.log(address.client.toString());
    // console.log(req.client);
    //Verificamos que la tarea pertenece al usuario del token
    if (address.client.toString() !== req.client.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado, la dirección no pertenece al cliente logueado')
    }
    // console.log("Entro 2"+ req.body);
    const addressModificado = await ClientAddress.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(addressModificado)
})
const deleteClientAddress = asyncHandler( async (req, res) => {
    const address = await ClientAddress.findById(req.params.id)
    if(!address){
        res.status(400)
        throw new Error('Dirección no encontrada')
    }
    //Verificamos que la tarea pertenece al usuario del token
    if (address.client.toString() !== req.client.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado, la dirección no pertenece al cliente logueado')
    }
    await address.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getClientAddress,
    setClientAddress,
    updateClientAddress,
    deleteClientAddress
}