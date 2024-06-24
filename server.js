const express = require('express')
const dotenv =require('dotenv').config()
const port = process.env.port
const app = express()
const router = require('./router/routerController')
const mongoose = require('mongoose')
app.use(express.json())
app.use(router)
mongoose.connect(process.env.database).then(()=>{
console.log('connection successful')
app.listen(port,()=>{
    console.log(`server runinnig on port ${port}`)
    })
}).catch((err)=>{
 console.log('connection failed'+err.message)
})