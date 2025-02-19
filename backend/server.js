const express = require('express');
const connect = require('./connect')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const awsRoutes = require('./routes/awsRoutes')
const userRoutes = require('./routes/userRoutes')
const multer = require('multer')
const upload = multer()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/images', awsRoutes)
app.use('/users', userRoutes)
app.use('/', productRoutes)

app.listen(PORT, () => {
  connect.connectToServer()
  console.log(`Server is running on PORT: ${PORT}`)
})