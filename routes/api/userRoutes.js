//Require express router.
const router = require('express').Router();
//Set up requirements from the User controller.
const { createUser, getUsers, getSingleUser, updateUserById, deleteUserById, addUserFriend, deleteUserFriend } =  require('../../controllers/userController')


//Set up GET route to get all users and POST route to create a user.

router.route('/').post(createUser).get(getUsers);

//Set up a GET route to get a user by id with populated thought and friend data, PUT route to update a user by id and DELETE route to delete a user by id.

router.route('/:userId').get(getSingleUser).put(updateUserById).delete(deleteUserById);

//Set up a POST route to add a friend to user friend list and a DELETE route to delete a friend from a user friend list  

router.route('/:friendId').post(addUserFriend).delete(deleteUserFriend);

//Export the router.
module.exports = router;