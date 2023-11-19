const { nanoid } = require("nanoid");
const notes = require("./notes.js");

const addNoteHandler = function (request, h) {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h
      .response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId: id,
        },
      })
      .header(
        "Access-Control-Allow-Origin",
        "http://notesapp-v1.dicodingacademy.com"
      )
      .code(201);

    return response;
  }

  // const response = h.response({
  //     status: 'failed',
  //     message: 'Catatan gagal ditambahkan',
  // }).header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com')

  const response = h.response({
    status: "failed",
    message: "Catatan gagal ditambahkan",
  });

  return response;
};

const getAllNotesHandler = () => ({
  status: "Success",
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.find((n) => n.id === id);

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = function (request, h) {
  const { id } = request.params;
  console.log(id);

  const { title, tags, body } = request.payload;

  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      id,
      updateAt,
    };

    const response = h
      .response({
        status: "success",
        message: "Catatan berhasil diperbarui",
      })
      .code(200);

    return response;
  }

  const response = h
    .response({
      status: "failed",
      message: "Catatan gagal diperbarui. Id tidak ditemukan.",
    })
    .code(404);

  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    const response = h
      .response({
        status: "success",
        message: "Catatan berhasil dihapus",
      })
      .code(200);

    return response;
  }

  const response = h
    .response({
      status: "failed",
      message: "Catatan gagal dihapus. Id tidak ditemukan.",
    })
    .code(404);

  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
