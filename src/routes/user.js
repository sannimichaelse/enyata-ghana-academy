const express = require('express') 
const router = express.Router() 
const { getBooks, addBook } = require('../controllers/book.controller')
const { loginUser } = require('../controllers/user.controller')
const { verifyAccount } = require('../middlewares/auth.middleware')

router.post('/login', loginUser)

module.exports = router