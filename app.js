const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user.route");
const verifyRoute = require("./routes/verify.route")
const cors_middle = require("./middleware/cors.middleware")
const dotenv = require("dotenv").config();
const logger = require("./middleware/logger");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors_middle);
app.get("/", (req, res, next) => {
    res.end("Pagina inicial");
    next();
});
app.use("/verify", verifyRoute);
app.use("/users", userRoute);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});