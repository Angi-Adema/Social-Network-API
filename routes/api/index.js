//Require express router.
const router = require("express").Router();

//Create routes for Thought and User.
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");

//Add the thoughts and users to the created routes.
router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

//Export the router.
module.exports = router;
