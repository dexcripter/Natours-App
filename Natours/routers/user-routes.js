const express = require('express');

const {
  getUser,
  deleteUser,
  getAllUser,
  updateUser,
  createUser,
} = require('../controllers/user-controller.js');

const { signup, signin } = require('../controllers/auth-controller.js');

const router = express.Router();

//auths
router.post('/signup', signup);
router.post('/signin', signin);

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
