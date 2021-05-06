const BookService = require('../services/book.service')

const getBooks = (req, res, next) => {
    const response = BookService.getBooks();
    return res.status(response.code).json(response);
}

const addBook = async (req, res, next) => {
    try {
        const response = await BookService.addBook(req.body);
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
