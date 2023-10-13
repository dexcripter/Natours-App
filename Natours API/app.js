const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`/${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      result: tours.length,
      tours: tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length - 1) {
    return res.status(404).json({
      status: "error",
      message: "Tour not found",
    });
  }
  res.status(200).json({ status: "success!", data: tour });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1] + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `/${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tours: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({ status: "page not found", message: "checck URL" });
  } else {
    const body = req.body;
    res.status(200).json({
      message: "updated tour successfully",
      data: {
        tours,
      },
    });
  }
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({ status: "page not found", message: "checck URL" });
  } else {
    const body = req.body;
    res.status(204).json({
      message: "Tour deleted",
      data: {
        tours,
      },
    });
  }
};

app.get("/api/v1/tours", getAllTours);
app.get("/api/v1/tours/:id", getTour);
app.post("/api/v1/tours", createTour);
app.patch("/api/v1/tours/:id", updateTour);
app.delete("/api/v1/tours/:id", deleteTour);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
