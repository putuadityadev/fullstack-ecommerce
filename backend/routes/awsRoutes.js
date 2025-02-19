const express = require("express")
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand, S3Client } = require("@aws-sdk/client-s3")
require("dotenv").config({path: "./.env"})
const multer = require("multer")
const upload = multer()

let awsRoutes = express.Router()

const s3Bucket = "shopdibucket"
const s3Client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

//Retrive one
awsRoutes.route("/:id").get(async (req, res) => {
  try {
    const id = req.params.id
    const bucketParams = {
      Bucket: s3Bucket,
      Key: id
    }

    const data = await s3Client.send(new GetObjectCommand(bucketParams))
    
    res.setHeader('Content-Type', data.ContentType)
    
    data.Body.pipe(res)

  } catch (err) {
    console.error("Error getting image", err)
    res.status(500).json({
      message: "Error retrieving image"
    })
  }
});

//create one
awsRoutes.route("/").post(upload.single('file'), async (req, res) => {
  try {
    if(!req.file) {
      return res.status(400).json({ message: "File not found" })
    }
    
    // Validasi tipe file
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if(!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: "Format file not supported" })
    }
    
    const file = req.file
    const uniqueKey = `${Date.now()}-${file.originalname}`
    
    const bucketParams = {
      Bucket: s3Bucket,
      Key: uniqueKey,
      Body: file.buffer,
      ContentType: file.mimetype
    }

    await s3Client.send(new PutObjectCommand(bucketParams))
    res.json({ 
      success: true,
      key: uniqueKey
    })
  } catch (err) {
    console.error("Error post image", err)
    res.status(500).json({
      message: err.message
    })
  }
})

module.exports = awsRoutes;