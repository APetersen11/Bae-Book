// add put and delete

const { User, Thought } = require("../models");
const userController = {
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  getSingleUser(req, res) {
    User.findOne({
      _id: req.params.userId,
    })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  updateUser({ body, params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $set: body }, { new: true })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
      .then((result) => {
        return User.findOneAndDelete({ _id: params.id }, { new: true });
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  removeFriend ({params}, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: {friends: params.friendId}},
        {new: true}
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json(err))
}};

module.exports = userController;
