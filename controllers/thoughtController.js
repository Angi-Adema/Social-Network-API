//Require the thought and user models.
const { Thought, User } = require("../models");

//Set up thoughts controller.
const thoughtController = {
  //Create a new thought.
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the thought! 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Get all thoughts.
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //Get a single thought by id.
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate({ path: "reactions", select: "-__v" })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Update a current thought by id.
  updateSingleThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID!" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Delete a current thought by id.
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json({ message: "Thought has been deleted!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Add a new reaction.
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No thought with this ID!" })
          : res.json({ message: "Reaction added!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete a reaction by id.
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId} } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No reaction with this ID!" })
          : res.json({ message: "Reaction deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};

//Export the user controller.
module.exports = thoughtController;
