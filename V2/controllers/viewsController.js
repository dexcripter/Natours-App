const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  // get tour data from the collection
  const tours = await Tour.find();

  // build the template

  // render the template

  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});

exports.getTour = (req, res) => {
  res.status(200).render("tour", { title: "The forest Gorilla" });
};
