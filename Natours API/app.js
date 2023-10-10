const express = require("express");
const fs = require("fs");

const app = express();
app.use(express());

const tours = JSON.parse(
  fs.readFileSync(`/${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      result: tours.length,
      tours: tours,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  console.log(req.body);
  res.send("Working");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
