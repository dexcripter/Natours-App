const express = require('express');
const fs = require('fs');
const url = require('url');

const app = express();
const port = 3000;

app.use(express.json());

///  READING  TEMPLATE FILES & LOCAL API
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
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
);

/// FUNCTIONS
function replaceTemplates(temp, product) {
    let output = temp;
    output = output.replace(/{%NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%LOCATION%}/g, product.from);
    output = output.replace(/{%VITAMINS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%%}/g, product.id);
    return output;
}

// ROUTING
app.get('/', (req, res) => {
    console.log(data.length);
    fs.writeFileSync(
        `${__dirname}/templates/template-card.html`,
        JSON.stringify(data)
    );
    res.send(tempOverview);
});
app.get('/overview', (req, res) => {
    const cardsHtml = dataObj
        .map((el) => replaceTemplates(tempCard, el))
        .join();
    const output = tempOverview.replace(/{%TEMPLATE-OVERVEIW%}/, cardsHtml);
    res.end(output);
});
app.get('/product/:id', (req, res) => {
    res.send(req.params.id);
});

// LISTENING TO SERVER
app.listen(port, () => {
    console.log(`Hello from port ${port}`);
});
