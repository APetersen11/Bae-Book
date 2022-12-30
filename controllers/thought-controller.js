const { User, Thought } = require("../models");

const thoughtController ={
    getThoughts(req, res) {
        Thought.find({})
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
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No thought found!" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
      },

      createThought({ body }, res) {
        Thought.create(body)
          .then(
            (body) =>
              User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: body._id } },
                { new: true }
              ),
            console.log(body)
          )
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.status(400).json(err));
      },
    

      updateThought({ body, params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $set: body },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },

    
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbReactionData => {
                if (!dbReactionData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbReactionData);
            })
            .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId} } },
            { new: true }
        )
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.json(err));
    }
    };

module.exports = thoughtController