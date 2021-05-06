const express = require('express')
const router = express.Router()
const BookController = require('../controllers/book.controller')
const BookValidator = require('../validators/book')
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware')



router.get('/', verifyToken, verifyAdmin, BookController.getBooks)

router.post('/', verifyToken, BookValidator.validateNewBook, BookController.addBook)

router.put('/:id', verifyToken, BookController.updateBook)

router.delete('/:id', verifyToken, BookController.deleteBook)

module.exports = router
