const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

// Con estas lineas son para recibir datos de formularios
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))

app.use('/api/clients', require('./routes/clientsRoutes'))
app.use('/api/clients/address', require('./routes/clientsAddressRoutes'))
app.use('/api/clients/order', require('./routes/clientsOrdersRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server iniciado en el puerto: ${port}`))