const express = require('express');

const {
  getUser,
  deleteUser,
  getAllUser,
  updateUser,
  createUser
} = require('../controllers/user-controller.js');

const router = express.Router();

router
  .route('/')
  .get(getAllUser)
  .post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
