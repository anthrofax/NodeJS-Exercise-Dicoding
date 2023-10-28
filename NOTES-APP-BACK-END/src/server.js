const Hapi = require('@hapi/hapi');
const routes = require('./routes.js');

const init = async function() {
    const server = Hapi.server({
        port: 8001,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    server.route(routes);

    await server.start();
    console.log('Server sedang berjalan.');
};

init();
