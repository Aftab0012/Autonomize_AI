const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/user/:username', userController.getUser);
router.get('/search/user', userController.searchUser);
router.delete('/user/:username', userController.deleteUser);
router.patch('/user/:username', userController.updateUser);
router.get('/allUsers', userController.sortByParams);
router.post('/addFriend/:username', userController.handleMutualFriends);

module.exports = router;
