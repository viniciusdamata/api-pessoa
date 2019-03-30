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

routes(app);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});