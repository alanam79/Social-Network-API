const router = require("express").Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require("../../controllers/user-controller");

// set up GET all and POST at /api/users
router.route("/").get(getAllUser).post(createUser);

// set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

//  /api/users/
// router.route("/:userId/friends").post(addFriend);

//  /api/users/
// router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
