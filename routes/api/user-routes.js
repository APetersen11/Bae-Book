



//put and delete


const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser, 
  addFriend
} = require("../../controllers/user-controller");

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser);
router.route("/:userId/friends/:friendId").post(addFriend);

module.exports = router;
