exports.getTours = (req, res, next) => {
  console.log('fetch');
  res.send('Hi from controller!');
};

exports.deleteTour = (req, res, next) => {
  res.send('deleted');
};
