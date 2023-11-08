const express = require('express');
const userController = require('./../contollers/user-controller');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .delete(userController.deleteUser)
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
