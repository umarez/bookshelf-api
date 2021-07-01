const books = require("./books");
const { nanoid } = require("nanoid");

const addBooks = (req, h) => {
  const bookData = [];

  const id = nanoid();

  const data = req.payload;
  const {
    name,
    year,
    string,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = data;

  const pushData = {
    id,
    ...data,
  };

  bookData.push(pushData);

  const response = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan!",
  });

  console.log(bookData);
  response.code(201);
  return response;
};

module.exports = { addBooks };
