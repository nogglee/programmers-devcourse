function route(pathname, handle, res, productId)
{
    console.log('pathname: ' + pathname);
    
    if (typeof handle[pathname] === 'function') { handle[pathname](res, productId); }
    else 
    {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>404 Not Found</h1>');
        res.end();
    }
    
}

exports.route = route;
