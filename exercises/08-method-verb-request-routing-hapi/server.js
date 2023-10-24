const Hapi = require('@hapi/hapi');
const routes = require('./routes.js');

const init = async function() {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    })

    server.route(routes);

    await server.start();
    console.log(`Server sudah bejalan pada ${server.info.uri}`);
}

init();