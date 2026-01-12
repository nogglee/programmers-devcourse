function main(res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Eunji LEE</h1>');
    res.end();
}

function login(res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Login Page</h1>');
    res.end();
}

let handles = {};

handles['/'] = main;
handles['/login'] = login;

exports.handle = handles;