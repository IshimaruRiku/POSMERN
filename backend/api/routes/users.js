const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/", UsersController.getAllUsers);

router.post("/", UsersController.postOneUser);

router.delete("/", UsersController.deleteAllUsers);

router.get("/:userId", UsersController.getOneUser);

router.put("/:userId", UsersController.putOneUser);

router.patch("/:userId", UsersController.patchOneUser);

router.delete("/:userId", UsersController.deleteOneUser);

module.exports = router;
