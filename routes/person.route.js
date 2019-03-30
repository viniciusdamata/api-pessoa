const controller = require("../controllers/person.controller");
const appRouter = (app) => {
   app.get("/", controller.homepage);
   app.get("/users", controller.allUsers);
   app.post("/users", controller.savePerson);
   app.get("/users/:id", controller.findOne);
   app.patch("/users/:id", controller.updateOne);
   



}

module.exports = appRouter;