const books = []

const getBooks = (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        code: 200,
        data: books
    })
}

const addBook = (req, res, next) => {
    const { name } = req.body

    const bookExist = books.find((element) => element.name === name);
    if(bookExist){
      return res.status(409).json({
        status: 'error',
        message: 'Book already exist',
        code: 409,
        data: null
       })
    }

    books.push(req.body)

    return res.status(201).json({
        status: 'success',
        message: 'Books inserted successfully',
        code: 201,
        data: books
    })
}



module.exports = {
    getBooks,
    addBook
}