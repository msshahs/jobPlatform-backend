const express = require("express");
const router = express.Router();

const UserController = require("../../controllers/app/userController");

router.get("/auth/linkedin/callback", UserController.userFormRecord);

module.exports = router;
