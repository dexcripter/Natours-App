const express = require('express');

const {
  getUser,
  deleteUser,
  getAllUser,
  updateUser,
  createUser,
} = require('../controllers/user-controller.js');

const { login, signup } = require('../controllers/auth-controller.js');

const router = express.Router();

//auths
router.post('/login', login);
router.post('/signup', signup);

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
