const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser, 
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require("../../controllers/user-controller");

router.route('/')
.get(getUsers)
.post(createUser)

router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

router.route('/:userId/friend/:friendId')
.post(addFriend)
.delete(removeFriend)

module.exports = router;
