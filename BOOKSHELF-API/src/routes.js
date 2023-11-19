const { menambahkanBuku } = require("./handler.js");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: menambahkanBuku,
  },
];

module.exports = routes;
