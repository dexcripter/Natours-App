const express = require('express');
const fs = require('fs');
const app = express();
const port = 3030;
app.use(express.json());

// READING FILES
const devData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const devDataObj = JSON.parse(devData);
const tempOverview = fs.readFileSync(
    `${__dirname}/templates/overview-template.html`,
    'utf-8'
);
const tempProduct = fs.readFileSync(
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

    if (!prod.organic) output.replace(/{%NOT-ORGANIC%}/g, 'not-organic');
    return output;
}

app.get('/', (req, res) => {
    const prototype = devDataObj.map((el) => replaceFxn(tempCard, el)).join();
    const display = tempOverview.replace(/{%TEMPLATE-CARD%}/, prototype);
    console.log(display);
    res.send(display);
});

app.get('/overview', (req, res) => {
    const prototype = devDataObj.map((el) => replaceFxn(tempCard, el)).join();
    const display = tempOverview.replace(/{%TEMPLATE-CARD%}/, prototype);
    console.log(display);
    res.send(display);
});

app.get('/product/:id', (req, res) => {
    const desiredId = devDataObj[req.params.id];
    console.log(desiredId);
    let replace = tempProduct;
    replace = replace.replace(/{%DESCRIPTION%}/g, desiredId.description);
    replace = replace.replace(/{%NAME%}/g, desiredId.productName);
    replace = replace.replace(/{%IMAGE%}/g, desiredId.image);
    replace = replace.replace(/{%DESTINATION%}/g, desiredId.from);
    replace = replace.replace(/{%PRICE%}/g, desiredId.price);
    replace = replace.replace(/{%VITAMINS%}/g, desiredId.nutrients);
    replace = replace.replace(/{%QUANTITY%}/g, desiredId.quantity);
    res.end(replace);
});

app.listen(port, () => {
    `Server is currently listening to port ${port}...`;
});
