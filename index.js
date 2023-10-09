const fs = require("fs");

const writeFile = fs.readFileSync("./txt/append.txt", "utf-8");
const reading = fs.readFileSync("./txt/start.txt", "utf-8");
const readingg = fs.readFileSync(`./txt/${reading}.txt`, "utf-8");

// console.log(writeFile);
console.log(readingg);
