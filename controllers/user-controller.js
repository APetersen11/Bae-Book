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
};

module.exports = userController;
