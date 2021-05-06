

/**
 * find book by title
 * - title
 */
const findBookByTitle = `
SELECT id, title,  author, published_at  FROM books WHERE title=$1
`;
/**
 * get all books
 */
const getAllBooks = `
SELECT * FROM books
`;
/**
 * add book
 * - title
 * - author
 * - published_at
 *
 */
const addBook = `
INSERT INTO 
  books(
    title, 
    author, 
    published_at,
    user_id
  ) 
VALUES ($1,$2,$3,$4) RETURNING id, title, author, published_at`;

module.exports = {
    getAllBooks,
    addBook,
    findBookByTitle
}
