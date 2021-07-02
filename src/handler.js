let books = require("./books");
const { nanoid } = require("nanoid");

const failedRes = (h, status, message, code) => {
  const response = h.response({
    status: status,
    message: message,
  });
  response.code(code);
  return response;
};

const addBooks = (req, h) => {
  const id = nanoid();

  const data = req.payload;

  const {
    name,
    year,
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
      message: "Buku berhasil ditambahkan",
      data: { bookId: id },
    });

    response.code(201);
    return response;
  } else if (!validateName) {
    return failedRes(
      h,
      "fail",
      "Gagal menambahkan buku. Mohon isi nama buku",
      400
    );
  } else if (!validateReadPage) {
    return failedRes(
      h,
      "fail",
      "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      400
    );
  } else {
    return failedRes(h, "error", "Buku gagal ditambahkan", 500);
  }
};

const getAllBooks = (req, h) => {
  const data = [];
  books.forEach((n) => {
    data.push({ id: n.id, name: n.name, publisher: n.publisher });
  });

  const response = h.response({
    status: "success",
    data: { books: data },
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
      data: { book: books[bookById] },
    });

    response.code(200);
    return response;
  }

  return failedRes(h, "fail", "Buku tidak ditemukan", 404);
};

const updateBook = (req, h) => {
  const id = req.params.bookId;

  const data = req.payload;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
  } = data;

  const bookExist = books.findIndex((n) => n.id === id);
  data.finished = data.pageCount === data.readPage;
  if (bookExist !== -1) {
    const insertedAt = books[bookExist].insertedAt;
    if (name !== undefined && readPage < pageCount) {
      const updatedAt = new Date().toISOString();
      books[bookExist] = {
        id,
        ...data,
        updatedAt,
        insertedAt,
      };

      const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
      });

      response.code(200);
      return response;
    } else if (name === undefined) {
      return failedRes(
        h,
        "fail",
        "Gagal memperbarui buku. Mohon isi nama buku",
        400
      );
    } else {
      return failedRes(
        h,
        "fail",
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        400
      );
    }
  }
  return failedRes(
    h,
    "fail",
    "Gagal memperbarui buku. Id tidak ditemukan",
    404
  );
};

const deleteBook = (req, h) => {
  const id = req.params.bookId;

  const filterBook = books.filter((n) => n.id == id).length;

  if (filterBook > 0) {
    books = books.filter((n) => n.id !== id);

    return failedRes(h, "success", "Buku berhasil dihapus", 200);
  }
  return failedRes(h, "fail", "Buku gagal dihapus. Id tidak ditemukan", 404);
};

module.exports = { addBooks, getAllBooks, getBookById, deleteBook, updateBook };
