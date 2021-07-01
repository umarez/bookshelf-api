const { addBooks, getAllBooks, getBookById } = require("./handler");

routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooks,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookById,
  },
  // {
  //   method: "PUT",
  //   path: "/books/{bookId}",
  //   handler: () => {},
  // },
  // {
  //   method: "DELETE",
  //   path: "/books/{bookId}",
  //   handler: () => {},
  // },
];

module.exports = { routes };
