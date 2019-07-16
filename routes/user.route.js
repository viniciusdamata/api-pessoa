const controller = require("../controllers/user.controller");
const express = require("express");

const router = express.Router();
router.get("/", controller.allUsers);
router.post("/", controller.saveUser);
router.get("/:id", controller.findUser);
router.delete("/:id", controller.deleteUser);
router.put("/all/:id", controller.updateUser);

module.exports = router;
