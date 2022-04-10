const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  addFriend,
  removeFriend,
  deleteUser

} = require('../../controllers/user-controller');

router
.route('/')
.get(getAllUsers)
.post(createUser);

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.put(addFriend)
.put(removeFriend)
.delete(deleteUser);

module.exports = router;

