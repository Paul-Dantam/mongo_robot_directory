const express = require("express");
const profileRoutes = express.Router();

profileRoutes.get("/profile/:id", (req, res) => {
  let requestedUserId = parseInt(req.params.id);
  //parse the data for this now
  let userPage = data.users.find(user => user.id === requestedUserId);

  res.render("profile", userPage);
});

module.exports = profileRoutes;
