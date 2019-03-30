const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/person.route.js");
const logger = require("./middleware/logger.js");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

routes(app);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});