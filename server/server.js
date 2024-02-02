var express = require("express");
var http = require("http");
var app = express();
require("dotenv").config();
const con = require("./routes/db");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var path = require("path");
var crypto = require("crypto");
var socket = require("socket.io");
var socketProcesses = require("./routes/socket");
const PORT = 5000;
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, '../client/build')));
app.use("/", require("./api/api_routes"));
//app.use("/*", require("./routes/pages"));
con.connect((err) => {
    if (err) {
        console.error("MySQL Connection Unsuccessful: " + err);
        return;
    }
    else {
        console.log("MySQL Connection Successful!");
    }
})

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

socketProcesses(server);
