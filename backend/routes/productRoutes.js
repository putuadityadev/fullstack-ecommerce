const express = require('express')
const database = require('../connect')
const ObjectId = require('mongodb').ObjectId

let productRoutes = express.Router()

//retrive all
productRoutes.route('/products').get(async (req, res) => {
  try {
    let db = database.getDb()
    let data = await db.collection('products').find({}).toArray()
    
    if(!data){
      console.log("Not found a data")
    } else {
      res.json(data)
    }
  } catch(err) {
    res.status(500).json({
      error: err.message,
      message: 'Error fetching data'
    })
  }
});

//retrive one
productRoutes.route('/products/:id').get(async (req, res) => {
  try {
    let db = database.getDb()
    let data = await db.collection('products').findOne({_id : new ObjectId(req.params.id)});

    if(data) {
      res.json(data)
    } else {
      throw new Error ("Data was not found")
    }
  } catch(err) {
    res.status(500).json({
      error: err.message,
      message: 'Error fetching data'
    })
  }
});

//create one
productRoutes.route('/products').post(async (req, res) => {
  try {
    const db = await database.getDb()
    const mongoObject = {
      productName: req.body.productName,
      price: Number(req.body.price),
      description: req.body.description,
      sizes: req.body.sizes,
      colors: req.body.colors,
      imageId: req.body.imageId,
      discount: Number(req.body.discount) || 0
    }

    const result = await db.collection('products').insertOne(mongoObject)
    res.status(201).json({
      _id: result.insertedId,
      ...mongoObject
    })

  } catch(err) {
    console.error("Error detail:", err)
    res.status(500).json({ 
      message: 'Gagal menyimpan produk',
      error: err.message 
    })
  }
});

//update one
productRoutes.route('/products/:id').put(async (req, res) => {
  try {
    let db = database.getDb()
    let mongoObject = {
      productName: req.body.productName,
      starts: req.body.stars,
      price: req.body.price,
      description: req.body.description,
      size: req.body.size,
      colors: req.body.colors
    }

    let data = await db.collection('products').updateOne({_id: new ObjectId(req.params.id)}, mongoObject)
    res.json(data)

  } catch(err) {
    res.status(500).json({
      error: err.message,
      message: 'Error fetching data'
    })
  }
});

//delete one
productRoutes.route('/products/:id').delete(async (req, res) => {
  try {
    let db = database.getDb()
    let data = await db.collection('products').delete({_id: new ObjectId(req.params.id)})
    res.json(data)

  } catch(err) {
    res.status(500).json({
      error: err.message,
      message: 'Error fetching data'
    })
  }
});


module.exports = productRoutes;