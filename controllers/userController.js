//Require the User model.
const { User } = require("../models");

//Set up users controller.
const userController = {
  //Create a new user.
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  //Get all users.
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //Get a single user by id.
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Update a current user by id.
  updateUserById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //Delete a current user by id.
  deleteUserById(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID" })
          : res.json({ message: "User has been deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add a friend
  addUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json({ message: "Friend added!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete a current friend.
  deleteUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json({ message: "Friend deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};

//Export the user controller.
module.exports = userController;
