const BookService = require('../services/book.service')

const getBooks = async (req, res, next) => {
    try {
        const response = await BookService.getBooks();
        return res.status(response.code).json(response);
    } catch (error) {
        next(error)
    }
}

const addBook = async (req, res, next) => {
    const { id } = req.decoded;
    try {
        const response = await BookService.addBook(req.body, id);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error)
    }
}

const updateBook = async (req, res, next) => {
    const {id} = req.params;
    try {
        const response = await BookService.updateBook(id, req.body)
        return res.status(response.code).json(response);
    } catch (error) {
        next(error)
    }
}

const deleteBook = async (req, res, next) => {
    const {id} = req.params;
    try {
        const response = await BookService.deleteBook(id)
        return res.status(response.code).json(response);
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook
}
