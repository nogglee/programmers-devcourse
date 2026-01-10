const mariadb = require('./database/connect/mariadb');
const fs = require('fs');
const mainHtml = fs.readFileSync('./main.html', 'utf-8');
const orderHtml = fs.readFileSync('./orderlist.html', 'utf-8');

function main(res)
{
    mariadb.query
    (
        "SELECT * FROM product", function( err, rows)
        { console.log(rows); }
    );

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(mainHtml);
    res.end();
}

function styleSheet(res) 
{
    fs.readFile('./style.css', function(err, data) 
    {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
    });
};

function redRacket(res)
{
    fs.readFile('./img/redRacket.png', function(err, data)
    {
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data);
        res.end();
    });
}

function blueRacket(res)
{
    fs.readFile('./img/blueRacket.png', function(err, data)
    {
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data);
        res.end();
    });
}

function blackRacket(res)
{
    fs.readFile('./img/blackRacket.png', function(err, data)
    {
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data);
        res.end();
    });
}

function order(res, productId)
{
    mariadb.query
    ( "INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');" );
    res.writeHead(302, {'Location': '/orderlist'});
    res.end();
}

function orderlist(res)
{
    res.writeHead(200, {'Content-Type': 'text/html'});

    mariadb.query
    (
        "SELECT * FROM orderlist", function( err, rows)
        { 
            res.write(orderHtml);
            rows.forEach(element => 
                {
                    res.write
                    (
                        `<tr>
                        <td>${element.product_id}</td>
                        <td>${element.order_date}</td>
                        </tr>
                        `
                    );
                }
            );
            res.end();
        }
    );

}

let handles = {};

handles['/'] = main;
handles['/order'] = order;
handles['/orderlist'] = orderlist;

handles['/style.css'] = styleSheet;

// image directories
handles['/img/redRacket.png'] = redRacket;
handles['/img/blueRacket.png'] = blueRacket;
handles['/img/blackRacket.png'] = blackRacket;

exports.handle = handles;