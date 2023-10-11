const express = require('express');
const fs = require('fs');
const url = require('url');

const app = express();
const port = 3000;

//  READING  TEMPLATE FILES & LOCAL API
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
);
const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
);
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
);
const data = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
);

// ROUTING
app.get('/', (req, res) => {
    console.log(data.length);
    res.send(tempOverview);
});

app.get('/product' || 'Okay', (req, res) => {
    res.send(tempProduct);
});

// LISTENING TO SERVER
app.listen(port, () => {
    console.log(`Hello from port ${port}`);
});
