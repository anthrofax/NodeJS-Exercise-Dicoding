const http = require('http');

const requestListener = function(request, response) {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const {method} = request;

    if (method === "POST") {
        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        })

        request.on('end', () => {
            const {name} = JSON.parse(body);
            response.end(`<h1>Hai, ${name}!</h1>\n`);
        })
    }
}

const server = http.createServer(requestListener);

const port = 5000;
const hostname = 'localhost';
server.listen(port, hostname, () => {
    console.log(`Server berjalan pada http://${hostname}:${port}`);
})