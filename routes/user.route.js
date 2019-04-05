const controller = require("../controllers/user.controller");
const express = require("express");
const cors = require("cors");
const corsConfig = cors({
   origin: "https://cadastroabe.netlify.com/"
});
const router = express.Router();
router.get("/", corsConfig, controller.allUsers);
router.post("/", corsConfig, controller.saveUser);
router.get("/:id", corsConfig, controller.findUser);
router.patch("/:id", corsConfig, controller.updatePassword);
router.delete("/:id", corsConfig, controller.deleteUser);
router.put("/all/:id", corsConfig, controller.updateAll)

module.exports = router;