"use strict";

const express = require("express");
const morgan = require("morgan");

const { users } = require("./data/users");

const PORT = process.env.PORT || 8001;

const handleHome = (req, res) => {
  res.render("pages/homepage", { title: "Welcome to FriendFace" });
};

const handleSignIn = (req, res) => {
  res.render("pages/signinPage", { title: "IT WORKED!" });
};

const handleUser = (req, res) => {
  const id = req.params.ad;
  console.log(req.params);
  //res.send("name received. " + req.query.firstName);
  let foundUser = users.find(user => user.id === id);
  let currentFriends = users.filter(user => {
    return foundUser.friends.includes(user.id);
  });
  res.render("pages/user", { title: "testuser", foundUser, currentFriends });
};

const handleName = (req, res) => {
  //res.send("name received. " + req.query.firstName);
  let foundUser = users.find(user => user.name === req.query.firstName);
  console.log(foundUser);
  if (foundUser === undefined) {
    res.redirect("/signin");
  }
  let currentFriends = users.filter(user => {
    return foundUser.friends.includes(user.id);
  });
  res.render("pages/user", { title: "user", foundUser, currentFriends });
};

// -----------------------------------------------------
// server endpoints
express()
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")

  // endpoints
  .get("/home", handleHome)
  .get("/signin", handleSignIn)
  .get("/user/:ad", handleUser)
  .get("/getname", handleName)

  .get("*", (req, res) => {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl
    });
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
