import * as express from "express";
import { Client } from "pg";
import axios from "axios";

// var connectionString = "postgres://postgres:postgres@localhost:5432/store_api";
// TO DO: set up .env and pull from there
const client = new Client({
  user: "store_user",
  password: "dbpass",
  host: "store-oracle-dev---vm",
  port: 5432,
  database: "store_api",
});
// const client = new Client({
//   connectionString: connectionString,
// });
client.connect();

const app = express();
app.use(express.json());

// check server status
app.get("/status", (_req, res) => {
  res.send();
});

app.post("/pull-from-baserow", (req, res) => {
  // do we want to pull *all* values and update db? or only specific ones?
  // TO DO: set up .env and pull from there
  const token = "token";
  axios({
    method: "GET",
    url: "https://api.baserow.io/api/database/rows/table/133974/?user_field_names=true",
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    res.send(response.data);
  });
  // TO DO: parse response and insert into db
  // respond with 200 or w/e
});

// for testing purposes only
app.get("/get-all", (_req, res) => {
  client.query("SELECT * FROM values", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        data: result.rows,
      });
    }
  });
});

app.get("/circulating-supply-store", (_req, res) => {
  client.query("SELECT * FROM values WHERE name = 'circulating supply store'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        data: result.rows,
      });
    }
  });
});

app.get("/security-budget-max-percent", (_req, res) => {
  client.query("SELECT * FROM values WHERE name = 'security budget max percent'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        data: result.rows,
      });
    }
  });
});

app.get("/current-security-budget-max-number", (_req, res) => {
  client.query("SELECT * FROM values WHERE name = 'security budget max number'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        data: result.rows,
      });
    }
  });
});

app.post("/set-security-budget", (req, res) => {
  const sb = req.body.sb;
  // upsert
  client.query(
    `INSERT INTO values(name, value) VALUES ('security budget', ${sb}) ON CONFLICT(name) DO UPDATE set value=EXCLUDED.value`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          data: result.rows,
        });
      }
    }
  );
});

app.listen("3000");
