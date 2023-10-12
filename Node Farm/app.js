const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
app.use(express.json());

// READING FILES
const devData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const devDataObj = JSON.parse(devData);
const tempOverview = fs.readFileSync(
    `${__dirname}/templates/overview-template.html`,
    'utf-8'
);
const prodOverview = fs.readFileSync(
    `${__dirname}/templates/product-template.html`,
    'utf-8'
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
);

function replaceFxn(temp, prod) {
    let output = temp;
    output = output.replace(/{%NAME%}/g, prod.productName);
    output = output.replace(/{%DESCRIPTION%}/g, prod.description);
    output = output.replace(/{%VITAMINS%}/g, prod.nutrients);
    output = output.replace(/{%LOCATION%}/g, prod.from);
    output = output.replace(/{%QUANTITY%}/g, prod.quantity);
    output = output.replace(/{%IMAGE%}/g, prod.image);
    output = output.replace(/{%id%}/g, prod.id);
    output = output.replace(/{%PRICE%}/g, prod.price);
    console.log(output);
}

app.get('/', (req, res) => {
    console.log(devDataObj);
    let prototype = devDataObj.map((el) => replaceFxn(tempCard, el));
    res.send(prototype);
});

app.listen(port, () => {
    `Server is currently listening to port ${port}...`;
});
