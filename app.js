const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoute = require("./routes/user.route");
const verifyRoute = require("./routes/verify.route");
const logger = require("./middleware/logger");

const app = express();
const URI = "<URI>";
dotenv.config();
const PORT = process.env.PORT || 3000;

mongoose.connect(URI, {
  autoReconnect: true,
  useNewUrlParser: true
});
let db = mongoose.connection;

db.once("open", () => {
  console.log("Conectado ao mongodb");
});

db.on("error", err => {
  console.log(err);
});

app.use(cors());
app.use(logger);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.send("Pagina inicial");
});
app.use("/verify", verifyRoute);
app.use("/users", userRoute);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
