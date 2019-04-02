const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user.route");
const cors_middle = require("./middleware/cors.middleware")
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors_middle)
app.get("/", (req, res, next) => {
    res.end("Pagina inicial");
    next();
});

app.use("/users", userRoute);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});