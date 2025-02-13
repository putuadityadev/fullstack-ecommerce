const express = require('express');
const connect = require('./connect')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/', productRoutes)

app.listen(PORT, () => {
  connect.connectToServer()
  console.log(`Server is running on PORT: ${PORT}`)
})