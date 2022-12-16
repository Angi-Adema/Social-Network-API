//Require the thought and user models.
const { Thought, User } = require('../models');

//Set up thoughts controller.
module.exports = {
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
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created the application 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

//Get all thoughts.
//Get a single thought by id.
//Update a current thought by id.
//Delete a current thought by id.
//Add a new reaction.
//Delete a reaction by id.
