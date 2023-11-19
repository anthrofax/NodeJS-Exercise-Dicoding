const Hapi = require("@hapi/hapi");
const routes = require("./routes.js");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: ["*"],
    },
  });

  server.route(routes);

  await server.start();
  console.log("Server sedang berjalan");
};

init();
