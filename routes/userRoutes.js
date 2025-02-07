const express = require("express");
const { registerUser, loginUser, updateUser, getUsers} = require("../controller/userController.js")
const router = express.Router();


router.post("/register", registerUser),
router.get("/", getUsers)
router.post("/login", loginUser);
router.put("/:id", updateUser)


module.exports = router;