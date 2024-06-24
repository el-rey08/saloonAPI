
const {createuser,getAll,getOne,login}= require('../controller/userController')
const router = require('express').Router()
router.post('/create',createuser)
router.get('/getall',getAll)
router.get('/getone/:ID',getOne)
router.post('/login',login)
module.exports= router