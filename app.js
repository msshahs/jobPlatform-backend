const express = require("express");
const body_parser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes");
require("dotenv").config();
require("./helper/response");
const connectDB = require("./database/connection.js");

const SHOULD_RUN_ON_HTTP = process.env.SHOULD_RUN_ON_HTTP;
const http = SHOULD_RUN_ON_HTTP == "true" ? require("http") : require("https");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

//connect to database
connectDB();

app.use(logger("dev"));
app.use(cors());

app.use(body_parser.json({ limit: "10mb", extended: true }));
app.use(body_parser.urlencoded({ limit: "10mb", extended: true }));
indexRouter(app);

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
