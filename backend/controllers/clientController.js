const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Client = require('../models/clientModel')

const loginClient = asyncHandler(async (req, res) => {

    //desestructuramos la informacion del body request
    const { email, password } = req.body

    //verificamos que recibamos la informacion que el modelo Client necesita
    if (!email || !password) {
        res.status(400)
        throw new Error('Favor de verificar que esten todos los datos')
    }

    //verificamos que el usuario exista
    const client = await Client.findOne({ email })

    //comparamos el hash del password y el usuario
    if (client && (await bcrypt.compare(password, client.password))) {
        res.status(200).json({
            _id: client.id,
            name: client.name,
            email: client.email,
            token: generateToken(client.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales Incorrectas')
    }
})

const registerClient = asyncHandler(async (req, res) => {

    //desestructuramos el body request
    const { name, email, password } = req.body

    //verificamos que recibamos la informacion que el modelo Client necesita
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Favor de verificar que esten todos los datos')
    }

    //verificamos que no exista ya ese usuario en la coleccion
    const clientExiste = await Client.findOne({ email })
    if (clientExiste) {
        res.status(400)
        throw new Error('Ese email ya fué registrado, el usuario ya existe')
    }

    //hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creamos el usuario
    const client = await Client.create({
        name,
        email,
        password: hashedPassword
    })

    //mandamos la respuesta de la funcion
    if (client) {
        res.status(201).json({
            _id: client.id,
            name: client.name,
            email: client.email
        })
    } else {
        res.status(400)
        throw new Error('No se pudo crear el usuario, datos incorrectos')
    }
})

const getMisDatos = asyncHandler(async (req, res) => {
    res.json(req.client)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    loginClient,
    registerClient,
    getMisDatos
}