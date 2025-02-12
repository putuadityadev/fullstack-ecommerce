const express = require('express');
const connect = require('./connect')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())


app.listen(PORT, () => {
  connect.conncetToServer()
  console.log(`Server is running on PORT: ${PORT}`)
})