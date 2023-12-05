const express = require('express');

const {
  getUser,
  deleteUser,
  getAllUser,
  updateUser,
  createUser,
  updateMe,
} = require('../controllers/user-controller.js');

const {
  login,
  signup,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/auth-controller.js');

const router = express.Router();

//auths
router.post('/login', login);
router.post('/signup', signup);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatepassword', protect, updatePassword);
router.patch('/updateme', updateMe);

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
