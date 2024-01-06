const {
  menambahkanBuku,
  melihatSemuaBuku,
  melihatBukuBerdasarkanId,
  mengubahBukuBerdasarkanId,
  menghapusBukuBerdasarkanId,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: menambahkanBuku,
  },
  {
    method: 'GET',
    path: '/books',
    handler: melihatSemuaBuku,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: melihatBukuBerdasarkanId,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: mengubahBukuBerdasarkanId,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: menghapusBukuBerdasarkanId,
  },
];

module.exports = routes;
