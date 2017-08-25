const express = require("express");
const empRoutes = express.Router();

const mongo = require("mongodb");
const ObjectId = mongo.ObjectID;
const dbUrl = "mongodb://localhost:27017/userDirectory";
const MongoClient = mongo.MongoClient;
let DB;
let Robots;

MongoClient.connect(dbUrl, (err, db) => {
  if (err) {
    return console.log("error connecting to the database", err);
  }
  DB = db;
  Robots = db.collection("robots");
});

empRoutes.get("/unemployed", (req, res) => {
  Robots.find({ job: null }).toArray((err, foundRobots) => {
    err
      ? res.status(500).send(err)
      : res.render("index", { users: foundRobots });
  });
});

empRoutes.get("/employed", (req, res) => {
  Robots.find({
    job: { $not: { $in: [null] } }
  }).toArray((err, foundRobots) => {
    err
      ? res.status(500).send(err)
      : res.render("index", { users: foundRobots });
  });
});

module.exports = empRoutes;
