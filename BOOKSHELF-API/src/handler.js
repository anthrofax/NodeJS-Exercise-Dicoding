const { nanoid } = require('nanoid');
const bookshelf = require('./bookshelf');

const menambahkanBuku = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === undefined) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);

    return response;
  }

  bookshelf.push(newBook);
  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      .code(201);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku',
  });

  return response;
};

const melihatSemuaBuku = (req, h) => {
  const { name, reading, finished } = req.query;
  let books = [];

  //   Logic jika ada query nama
  if (name !== undefined) {
    books = bookshelf
      .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
      ?.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

    if (books.length > 0) {
      const response = h
        .response({
          status: 'success',
          data: {
            books,
          },
        })
        .code(200);

      return response;
    }
  }

  //   Logic jika ada query reading
  if (reading !== undefined) {
    if (+reading !== 0 && +reading !== 1) {
      const response = h.response({
        status: 'fail',
        message: 'Nilai reading harus hanya boleh bernilai 0 atau 1.',
      });

      return response;
    }

    books = bookshelf
      .filter((book) => {
        if (+reading === 0) return book.reading === false;
        if (+reading === 1) return book.reading;

        return false;
      })
      ?.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

    if (books.length > 0) {
      const response = h
        .response({
          status: 'success',
          data: {
            books,
          },
        })
        .code(200);

      return response;
    }
  }

  //   Logic jika ada query finished
  if (finished !== undefined) {
    if (+finished !== 0 && +finished !== 1) {
      const response = h.response({
        status: 'fail',
        message: 'Nilai finished harus hanya boleh bernilai 0 atau 1.',
      });

      return response;
    }

    books = bookshelf
      .filter((book) => {
        if (+finished === 0) return book.finished === false;
        if (+finished === 1) return book.finished;

        return false;
      })
      ?.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

    if (books.length > 0) {
      const response = h
        .response({
          status: 'success',
          data: {
            books,
          },
        })
        .code(200);

      return response;
    }
  }

  books = bookshelf.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = h
    .response({
      status: 'success',
      data: {
        books,
      },
    })
    .code(200);

  return response;
};

const melihatBukuBerdasarkanId = (req, h) => {
  const { bookId } = req.params;

  const foundBook = bookshelf.find((book) => book.id === bookId);

  if (foundBook !== undefined) {
    const response = h
      .response({
        status: 'success',
        data: {
          book: foundBook,
        },
      })
      .code(200);

    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);

  return response;
};

const mengubahBukuBerdasarkanId = (req, h) => {
  const { bookId } = req.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const updatedAt = new Date().toISOString();

  const index = bookshelf.findIndex((book) => book.id === bookId);

  if (name === undefined) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);

    return response;
  }

  if (index !== -1) {
    bookshelf[index] = {
      ...bookshelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);

    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404);

  return response;
};

const menghapusBukuBerdasarkanId = (req, h) => {
  const { bookId } = req.params;

  const index = bookshelf.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    bookshelf.splice(index, 1);

    const response = h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);

    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    .code(404);

  return response;
};

module.exports = {
  menambahkanBuku,
  melihatSemuaBuku,
  melihatBukuBerdasarkanId,
  mengubahBukuBerdasarkanId,
  menghapusBukuBerdasarkanId,
};
