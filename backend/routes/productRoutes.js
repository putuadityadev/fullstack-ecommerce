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
      res(data)
    }
  } catch(err) {
    res.status(500).json({
      error: err.message,
      message: 'Eror fetching data'
    })
  }
});

//retrive one
productRoutes.route('/products/:id').get(async (req, res) => {
  try {
    let db = database.getDb()
    let data = await db.collection('products').findOne({_id : new ObjectId(req.params.id)});

    if(ObjectId.keys(data).length > 0) {
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
    let db = database.getDb()
    let mongoObject = {
      productName: req.body.productName,
      starts: req.body.stars,
      price: req.body.price,
      description: req.body.description,
      size: req.body.size,
      colors: req.body.colors
    }

    let data = await db.collection('products').insertOne(mongoObject)
    res.json(data)

  } catch(err) {
    res.status(500).json({
      error: err.message,
      message: 'Error fetching data'
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