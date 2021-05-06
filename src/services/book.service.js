const books = [];

const getBooks = () => {
    return {
        status: 'success',
        code: 200,
        message: 'Books fetched successfully',
        data: books
    }
}

const addBook = async (body) => {
    const {name} = body
    const bookExist = books.find((element) => element.name === name);
    if (bookExist) {
        throw {
            status: 'error',
            message: 'Book already exist',
            code: 409,
            data: null
        }
    }

    books.push(body)

    return {
        status: 'success',
        message: 'Books inserted successfully',
        code: 201,
        data: books
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
