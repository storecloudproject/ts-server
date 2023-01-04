import * as express from "express";
import { Client } from "pg";

var connectionString = "postgres://postgres:postgres@localhost:5432/jordan";
const client = new Client({
  connectionString: connectionString,
});
client.connect();

const app = express();

app.get("/", (_req, res) => {
  res.send("server is working...");
});

app.get("/get-from-db", (_req, res) => {
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

app.get("/write-to-db", (_req, res) => {
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

app.get("/math-test", (_req, res) => {
  const limit: number = 10 * 10 ** 8;

  let numerator: number = 0;
  let denominator: number = 1;
  let result: number = 0;

  for (let i: number = 0; i < limit; i++) {
    result += numerator++ / denominator++;
  }
  res.send({ value: result });
});

app.get("/simple-math", (_req, res) => {
  res.send({ value: (999 * 888) / 777 });
});

app.get("/get-from-api", (_req, res) => {
  fetch("https://httpbin.org/get")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      res.send({ data: data });
    });
});

app.listen("3000");
