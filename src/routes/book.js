const express = require('express') 
const router = express.Router() 
const BookController = require('../controllers/book.controller')
const { verifyToken } = require('../middlewares/auth.middleware')


const books = []

router.get('/', verifyToken, BookController.getBooks)

router.post('/', verifyToken, BookController.addBook)

router.put('/:id', verifyToken, BookController.updateBook)

router.delete('/:id', verifyToken, BookController.deleteBook)

module.exports = router