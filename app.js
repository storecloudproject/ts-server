const express = require("express");
const { Client } = require("pg");

var connectionString = "postgres://postgres:postgres@localhost:5432/jordan";
const client = new Client({
  connectionString: connectionString,
});
client.connect();

const app = express();

app.get("/", (req, res) => {
  res.send("server is working...");
});

app.get("/get-from-db", (req, res) => {
  client.query("SELECT * FROM data", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        data: result.rows,
      });
    }
  });
});

app.get("/write-to-db", (req, res) => {
  client.query("INSERT INTO data VALUES (888)", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        data: result.rows,
      });
    }
  });
});

app.get("/math-test", (req, res) => {
  const limit = 10 * 10 ** 8;

  let numerator = 0;
  let denominator = 1;
  let result = 0;

  for (let i = 0; i < limit; i++) {
    result += numerator++ / denominator++;
  }
  res.send({ value: result });
});

app.get("/simple-math", (req, res) => {
  let a = 999;
  let b = 888;
  let c = 777;

  res.send({ value: (a * b) / c });
});

app.get("/get-from-api", (req, res) => {
  fetch("https://httpbin.org/get")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      res.send({ data: data });
    });
});

app.listen("3000");
