const { runQuery } = require('../config/database.config')
const {findBookByTitle, addBook:addBookQuery, getAllBooks} = require('../queries/book')

const getBooks = async () => {
    const books = await runQuery(getAllBooks);
    return {
        status: 'success',
        code: 200,
        message: 'Books fetched successfully',
        data: books
    }
}

const addBook = async (body, id) => {
    const {title, author} = body

    const book = await runQuery(findBookByTitle, [title]);
    if(book.length > 0){
        throw {
            status: 'error',
            message: 'Book already exist',
            code: 409,
            data: null
        }
    }

    const publishedAt = new Date();
    const response = await runQuery(addBookQuery, [title, author, publishedAt, id]);

    return {
        status: 'success',
        message: 'Books added successfully',
        code: 201,
        data: response[0]
    }
}

const updateBook = async (id, body) => {
    const {name, title, author} = body
    const bookIndex = books.findIndex((element) => element.id == id)
    if (bookIndex >= 0) {
        books[bookIndex] = {
            ...books[bookIndex],
            name,
            author,
            title
        }

        return {
            status: 'success',
            message: 'Books updated successfully',
            code: 200,
            data: books
        }
    }

    throw {
        status: 'error',
        message: 'Book not found',
        code: 400,
        data: null
    }
}

const deleteBook = async (id) => {
    const bookIndex = books.findIndex((element) => element.id == id)
    if (bookIndex >= 0) {
        books.splice(bookIndex, 1);
        return {
            status: 'success',
            message: 'Book deleted successfully',
            code: 200,
            data: books
        }
    }

    throw {
        status: 'error',
        message: 'Book not found',
        code: 400,
        data: null
    }
}

module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook
}
