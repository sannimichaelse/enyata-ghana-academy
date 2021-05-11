const express = require('express')
const { loginUser, createUser, getBanks, validateCustomer } = require('../controllers/user.controller')
const { validateUserSignup,validateUserLogin } = require('../validators/user')
const { validateAccountInfo } = require('../validators/account')
const { verifyToken } = require('../middlewares/auth.middleware')
const router = express.Router()
router.post('/login', validateUserLogin,loginUser)
router.post('/signup',validateUserSignup, createUser)
router.get('/get-banks',verifyToken, getBanks)
router.post('/validate-customer',verifyToken, validateAccountInfo, validateCustomer)

module.exports = router
