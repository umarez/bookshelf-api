const books = require("./books");
const { nanoid } = require("nanoid");

const addBooks = (req, h) => {
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

  const validateReadPage = !(data.readPage > data.pageCount);
  const validateName = data.name !== undefined;
  const finished = data.pageCount === data.readPage;

  if (validateName && validateReadPage) {
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const pushData = {
      id,
      ...data,
      finished,
      insertedAt,
      updatedAt,
    };

    books.push(pushData);

    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan!",
    });

    response.code(201);
    return response;
  } else if (!validateName) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (!validateReadPage) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  } else {
    const response = h.response({
      status: "error",
      message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
  }
};

const getAllBooks = (req, h) => {
  const response = h.response({
    status: "success",
    data: { books },
  });

  response.code(200);
  return response;
};

const getBookById = (req, h) => {
  const id = req.params.bookId;

  const bookById = books.findIndex((n) => n.id === id);
  if (bookById !== -1) {
    const response = h.response({
      status: "success",
      data: books[bookById],
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = { addBooks, getAllBooks, getBookById };
