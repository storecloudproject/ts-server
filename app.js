"use strict";
exports.__esModule = true;
var express = require("express");
var pg_1 = require("pg");
var connectionString = "postgres://postgres:postgres@localhost:5432/jordan";
var client = new pg_1.Client({
    connectionString: connectionString
});
client.connect();
var app = express();
app.get("/", function (_req, res) {
    res.send("server is working...");
});
app.get("/get-from-db", function (_req, res) {
    client.query("SELECT * FROM data", function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.send({
                data: result.rows
            });
        }
    });
});
app.get("/write-to-db", function (_req, res) {
    client.query("INSERT INTO data VALUES (888)", function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.send({
                data: result.rows
            });
        }
    });
});
app.get("/math-test", function (_req, res) {
    var limit = 10 * Math.pow(10, 8);
    var numerator = 0;
    var denominator = 1;
    var result = 0;
    for (var i = 0; i < limit; i++) {
        result += numerator++ / denominator++;
    }
    res.send({ value: result });
});
app.get("/simple-math", function (_req, res) {
    res.send({ value: (999 * 888) / 777 });
});
app.get("/get-from-api", function (_req, res) {
    fetch("https://httpbin.org/get")
        .then(function (res) {
        return res.json();
    })
        .then(function (data) {
        res.send({ data: data });
    });
});
app.listen("3000");
