//Require express router.
const router = require("express").Router();

//Set up the requirements from the thought controller.
const {
  createThought,
  getThoughts,
  getSingleThought,
  updateSingleThought,
  deleteThought,
  addReaction,
} = require("../../controllers/thoughtController");

//Set up GET route to get all thoughts.
router.route("/").get(getThoughts);

//Set up GET route to get thought by id, PUT route to update thought by id and DELETE to delete the thought by its id.
router
  .route("/:userId")
  .get(getSingleThought)
  .put(updateSingleThought)
  .delete(deleteThought);

//Set up POST route to create a thought (push created thought to id to the associated user's thoughts array field).
router.route("/:userId").post(createThought);

//Set up a POST route to create a reaction stored in a single thought's reactions array field.
router.route("/:thoughtId/reactions").post(addReaction);

//Set up a DELETE route to delete a reaction by its reactionId value.

//Export the router.
module.exports = router;
