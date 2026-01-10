/* 
 * require는 node.js에서 module을 불러오는 키워드이다.
 * module은 재사용 가능한 코드 조각이다. 
 * http module은 웹 서버를 생성하는 데 사용된다.
 */
let http = require('http');
let url = require('url');

function start(route, handle) {
    /* 
    * root 폴더에서 server.js를 실행하면 8080 포트로 서버가 열린다.
    * 실행 명령어: node server.js
    */
    http.createServer
    (
        function onRequest(req, res)
        {
            let pathname = url.parse(req.url).pathname;
            let queryData = url.parse(req.url, true).query;
            
            console.log('queryData: ' + queryData.productId);
            
            route(pathname, handle, res, queryData.productId);

        }
    ).listen(8080);
}

exports.start = start;
