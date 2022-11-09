// add put and delete


const { User, Thought } = require("../models");
const thoughtController ={
    getThoughts(req, res) {
        Thought.find()
          .select("-__v")
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      },
      getSingleThought(req, res) {
        Thought.findOne({
          _id: req.params.userId,
        })
          .select("-__v")
          .populate("thoughts")
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      },
      createThought(req, res) {
        Thought.create(req.body)
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      },
    };

module.exports = thoughtController