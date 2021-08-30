var express = require("express");
var app = express();

const path = require("path");
const location = path.join(__dirname, "/db/");
const db = require("electron-db");

var cors = require("cors");
var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/", function (req, res) {
  res.send("hello, world");
});

async function sort(order, data) {
  return await data.sort(function (a, b) {
    return new Date(a.date).getTime() > new Date(b.date).getTime()
      ? order === "asc"
        ? -1
        : 1
      : order === "desc"
        ? 1
        : -1;
  });
}

app.get("/api/entries", function (req, res) {
  db.getAll("entries", location, async (succ, data) => {
    if (succ) {
      res.json({ entries: await sort("asc", data) });
    } else {
      console.log("An error has occured. " + data);
    }
  });
});

app.post("/api/entries/add/", function (req, res) {
  console.log(req.body);
  if (db.valid("entries", location)) {
    db.insertTableContent("entries", location, req.body, (succ, msg) => {
      // succ - boolean, tells if the call is successful
      console.log("Success: " + succ);
      console.log("Message: " + msg);
    });
  }
});

app.get("/api/entries/sort/:order", function (req, res) {
  console.log(req.params);
  let order = req.params.order;
  if (db.valid("entries", location)) {
    db.getAll("entries", location, async (succ, data) => {
      if (succ) {
        res.json({
          entries: await sort(order, data),
        });
      } else {
        console.log("An error has occured. " + data);
      }
    });
  }
});

app.delete("/api/entries/delete/:id", async function (req, res) {
  let id_ = Number(req.params.id);
  const where = { id: id_ };

  await db.deleteRow("entries", location, where, async (succ, msg) => {
    try {
      console.log(JSON.stringify(succ));
    } catch (err) {
      console.log(JSON.stringify(msg));
    }
  });
});

app.delete("/api/entries/deleteAll", function (req, res) {
  db.clearTable("entries", location, (succ, msg) => {
    if (succ) {
      console.log(succ, "SUCCESS");
    } else {
      console.log(msg, "MSD");
    }
  });
});

const server = app.listen(3000, () =>
  console.log(`Express server listening on port 3000`)
);

module.exports = app;
