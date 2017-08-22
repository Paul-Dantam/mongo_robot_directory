const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const port = process.env.PORT || 8000;
const indexRoutes = require("./routes/indexRoutes");
const profileRoutes = require("./routes/profileRoutes");

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;
const dbUrl = "mongodb://localhost:27017/userDirectory";
let DB;
let Robots;

const app = express();

MongoClient.connect(dbUrl, (err, db) => {
  if (err) {
    return console.log("error connecting to the database", err);
  }

  DB = db;
  Robots = db.collection("robots");
});

// This is how you can add from a js object file

// app.get("/addrobots", (req, res) => {
//   Robots.insertMany(data.users, (err, savedRobots) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     res.send(savedRobots);
//   });
// });

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "public")));

//routes
// app.use("/", indexRoutes);
// app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  Robots.find({}).toArray((err, foundRobots) => {
    err
      ? res.status(500).send(err)
      : res.render("index", { users: foundRobots });
  });
});

app.get("/profile/:id", (req, res) => {
  Robots.findOne({ _id: ObjectId(req.params.id) }, (err, foundRobot) => {
    if (err) res.status(500).send(err);
    if (!foundRobot) res.send("No User Found");
    res.render("profile", { data: foundRobot });
  });
});

app.get("/unemployed", (req, res) => {
  Robots.find({ job: null }).toArray((err, foundRobots) => {
    err
      ? res.status(500).send(err)
      : res.render("index", { users: foundRobots });
  });
});

app.get("/employed", (req, res) => {
  Robots.find({
    job: { $not: { $in: [null] } }
  }).toArray((err, foundRobots) => {
    err
      ? res.status(500).send(err)
      : res.render("index", { users: foundRobots });
  });
});

// app.get("/profile/:country", (req, res) => {
//   Robots.find({});
// });

app.get("/profile/:skill", (req, res) => {
  Robots.findOne({ skills: ObjectId(req.params.skill) }, (err, foundRobot) => {
    if (err) res.status(500).send(err);
    if (!foundRobot) res.send("No User Found");
    console.log({ data: foundRobot });
    res.render("profile", { data: foundRobot });
  });
});

app.listen(port, function() {
  console.log(`server is running on port ${port}!`);
});
