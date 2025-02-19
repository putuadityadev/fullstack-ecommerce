const express = require('express')
const database = require('../connect')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: './.env'})

let userRoutes = express.Router()
const SALT_ROUNDS = 4

//retrive all
userRoutes.route('/').get(async (req, res) => {
  try {
    let db = database.getDb()
    let data = await db.collection('users').find({}).toArray()
    
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
userRoutes.route('/:id').get(async (req, res) => {
  try {
    let db = database.getDb()
    let data = await db.collection('users').findOne({_id : new ObjectId(req.params.id)});

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
userRoutes.route('/').post(async (req, res) => {
  try {
    const db = await database.getDb()
    const takenEmail = await db.collection("users").findOne({email: req.body.email})
    if(takenEmail){
      res.json({message: "Email already taken!"})
    } else {
      const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS)
      const mongoObject = {
      email: req.body.email,
      name: req.body.name,
      password: hash,
      role: "Customer",
      joinDate: new Date(),
      cart: []
      }

      const result = await db.collection('users').insertOne(mongoObject)
      res.status(201).json({
        _id: result.insertedId,
        ...mongoObject,
        message: "Account successfully created!"
      })
    }
  } catch(err) {
    console.error("Error detail:", err)
    res.status(500).json({ 
      message: 'Gagal menyimpan produk',
      error: err.message 
    })
  }
});

//login one
userRoutes.route('/login').post(async (req, res) => {
  const db = database.getDb()
  const user = await db.collection('users').findOne({email: req.body.email})

  if(user) {
    let confirmPass = await bcrypt.compare(req.body.password, user.password)
    if(confirmPass) {
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
      res.json({success: true, token})
    } else {
      res.json({success: false, message: "Password incorrect!"})
    }
  } else {
    res.json({success: false, message: "User not found!"})
  }
})

//update one
userRoutes.route('/:id').put(async (req, res) => {
  try {
    let db = database.getDb()
    let mongoObject = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: "Customer",
      cart: []
    }

    let data = await db.collection('users').updateOne({_id: new ObjectId(req.params.id)}, mongoObject)
    res.json(data)

  } catch(err) {
    res.status(500).json({
      error: err.message,
      message: 'Error fetching data'
    })
  }
});

//delete one
userRoutes.route('/:id').delete(async (req, res) => {
  try {
    let db = database.getDb()
    let data = await db.collection('users').delete({_id: new ObjectId(req.params.id)})
    res.json(data)

  } catch(err) {
    res.status(500).json({
      error: err.message,
      message: 'Error fetching data'
    })
  }
});


module.exports = userRoutes;