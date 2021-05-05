const express = require('express') 
const router = express.Router() 
const { getBooks, addBook } = require('../controllers/book.controller')
const { verifyAccount } = require('../middlewares/auth.middleware')


const books = []

router.get('/', verifyAccount, getBooks)

router.post('/', verifyAccount, addBook)

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, title, author } = req.body
    const bookIndex = books.findIndex((element) => element.id === id)
    if(bookIndex >= 0){
        books[bookIndex] = {
            ...books[bookIndex],
            name,
            author,
            title
        }

        return res.status(200).json({
            status: 'success',
            message: 'Books updated successfully',
            code: 200,
            data: books
        })
    }

    return res.status(400).json({
        status: 'error',
        message: 'Book not found',
        code: 400,
        data: null
      })
 
})


router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    const bookIndex = books.findIndex((element) => element.id === id)
    if(bookIndex >= 0){
        books.splice(bookIndex, 1);
        return res.status(200).json({
            status: 'success',
            message: 'Book deleted successfully',
            code: 200,
            data: books
        })
    }

    return res.status(400).json({
        status: 'error',
        message: 'Book not found',
        code: 400,
        data: null
     })


})

module.exports = router