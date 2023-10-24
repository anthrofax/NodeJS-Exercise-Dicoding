const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Homepage";
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return "About";
    },
  },
  {
    method: "*",
    path: "/about",
    handler: (request, h) => {
      return `Halaman tidak dapat diakses dengan method tersebut`;
    },
  },
  {
    method: "GET",
    path: "/hello/{username?}",
    handler: (request, h) => {
      const { username = 'stranger' } = request.params;
      const { lang } = request.query;

      if (lang === 'id') return`Halo, ${username}!`

      return `Hiii, ${username}!`
    },
  },
  {
    method: "*",
    path: "/{path*}",
    handler: (request, h) => {
      return "Halaman tidak ditemukan.";
    },
  },
];

module.exports = routes;
