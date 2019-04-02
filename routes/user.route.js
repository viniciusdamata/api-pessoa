const controller = require("../controllers/user.controller");
const express = require("express");
const cors = require("cors");

const router = express.Router();
   router.get("/", cors(
      {origin: "https://cadastroabe.netlify.com/"}
   ),controller.allUsers);
   router.post("/", controller.saveUser);
   router.get("/:id", controller.findUser);
   router.patch("/:id", controller.updateUser);
   router.delete("/:id", controller.deleteUser);
   





module.exports = router;