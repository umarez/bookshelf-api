const {
  addBooks,
  getAllBooks,
  getBookById,
  deleteBook,
  updateBook,
  getBooks,
} = require("./handler");

routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooks,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBook,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBook,
  },
  
];

module.exports = { routes };
