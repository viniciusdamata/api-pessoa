const controller = require("../controllers/user.controller");
const express = require("express");
const cors = require("cors");
// const corsConfig = cors({
//    origin: "https://cadastroabe.netlify.com/"
// });
const router = express.Router();
router.get("/",controller.allUsers);
router.post("/", controller.saveUser);
router.get("/:id", controller.findUser);
router.patch("/:id", controller.updatePassword);
router.delete("/:id", controller.deleteUser);
router.put("/all/:id", controller.updateAll);

module.exports = router;
