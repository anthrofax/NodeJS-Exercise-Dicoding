const Hapi = require('@hapi/hapi');

const init = async function() {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    })

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'Homepage';
            },
        },
        {
            method: 'GET',
            path: '/about',
            handler: (request, h) => {
                return 'About Page';
            },
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();