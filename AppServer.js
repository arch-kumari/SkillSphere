"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var App_1 = require("./App");
dotenv.config();
var port = process.env.PORT;
var dbUser = process.env.DB_USER;
var dbPassword = process.env.DB_PASSWORD;
var dbProtocol = process.env.DB_PROTOCOL;
var dbCluster = process.env.DB_CLUSTER;
var dbOptions = process.env.DB_OPTIONS;
var mongoDBConnection = "".concat(dbProtocol).concat(dbUser, ":").concat(encodeURIComponent(dbPassword), "@").concat(dbCluster).concat(dbOptions);
console.log("server db connection URL " + mongoDBConnection);
var server = new App_1.App(mongoDBConnection).express;
server.listen(port || 8080, function () {
    console.log("Server running on port ".concat(port));
});
