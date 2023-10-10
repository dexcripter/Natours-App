const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const oData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    if (pathname == '/' || pathname == '/overview') {
        res.writeHead(200, { 'content-type': 'app/json' });

        res.end(data);
    }
});

server.listen(port, () => {
    console.log(`server is currently listening to port ${port} ...`);
});
