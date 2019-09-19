const requestHandler = (request, response) => {
    const url = request.url;
    const method = request.method;

    if (url == '/') {
        response.write('<html>');
        response.write('<head><title>Node JS Driven Server</title></head>');
        response.write('<body><form action="/create-user" method="POST"><input type="text" name="name"/><button type="submit">Submit</button></form></body>');
        response.write('</html>')
        return response.end();
    }

    if (url == '/users') {
        response.write('<html>');
        response.write('<head><title>Node JS Driven Server</title></head>');
        response.write('<body><ul><li>Bruno</li><li>Furca</li><li>Furquim</li></body>');
        response.write('</html>')
        return response.end();
    }

    const body = [];

    if (url == '/create-user' && method == 'POST') {
        request.on('data', (chunk) => {
            body.push(chunk);
        });

        return request.on('end', () => {
            //parses content
            const parsedBody = Buffer.concat(body).toString();

            //logs to the console
            console.log(parsedBody.split('=')[1]);
            
            //Redirects to the user list
            response.writeHead(
                302,
                {
                    'Location': '/users'
                }
            )
            response.end();
        })
    }

    //Generic greeting
    response.write('<html>');
    response.write('<head><title>Node JS Driven Server</title></head>');
    response.write('<body><h1>Greetings!</h1></body>');
    response.write('</html>')
    return response.end();
}

module.exports = requestHandler;