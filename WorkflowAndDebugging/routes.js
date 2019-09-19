const fileSystem = require('fs');

const requestHandler = (request, response) => {

    const url = request.url;
    const method = request.method;
    if (url === '/') {
        response.write('<html>');
        response.write('<head><title>Enter Message</title></head>');
        response.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
        response.write('</html>');
        return response.end();
    }

    if (url == '/message' && method == 'POST') {

        

        const body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        });

        //Without this return statement, the code would continue outside this if block would continue to run, setting a header after the response was sent, which returns an error.
        return request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();

            const message = parsedBody.split('=')[1];
            fileSystem.writeFile('message.txt', message, error => {

                //The following code can also be written as
                //response.setHeader('Location', '/')
                //response.statusCode = 302

                response.writeHead(302, {
                    'Location': '/'
                });
                response.end();
            });
        });

    }

    response.write('<html>');
    response.write('<head><title>My First Page</title></head>');
    response.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    response.write('</html>');
    response.end();
}

module.exports = {
    requestHandler
}
