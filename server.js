const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const port = process.env.PORT || 8000;
const indexRoutes = require("./routes/indexRoutes");
const profileRoutes = require("./routes/profileRoutes");
const empRoutes = require("./routes/employmentRoutes");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;
const dbUrl = "mongodb://localhost:27017/userDirectory";
const app = express();

//templating engine
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/", indexRoutes);
app.use("/profile", profileRoutes);
app.use("/employment", empRoutes);

app.listen(port, function() {
  console.log(`server is running on port ${port}!`);
});
