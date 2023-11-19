const { nanoid } = require("nanoid");
const bookshelf = require("./bookshelf.js");

const menambahkanBuku = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertAt = new Date().toISOString();
  const updateAt = insertAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: false,
    reading,
    insertAt,
    updateAt,
  };

  bookshelf.push(newBook);

  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h
      .response({
        status: "Success",
        message: "Berhasil menambahkan buku",
        data: {
          bookId: id,
        },
      })
      .code(201);

    return response;
  }

  const response = h.response({
    status: "Failed",
    message: "Gagal menambahkan buku",
  });

  return response;
};

module.exports = { menambahkanBuku };
