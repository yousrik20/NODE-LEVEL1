const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema.js");
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require("moment"); // require

var methodOverride = require("method-override");
app.use(methodOverride("_method"));
// auto refresh to apply static file changes CSS, JS, IMG...

//const path = require("path");
//const livereload = require("livereload");
//const liveReloadServer = livereload.createServer();
//liveReloadServer.watch(path.join(__dirname, 'public'));

//const connectLivereload = require("connect-livereload");
//app.use(connectLivereload());

//liveReloadServer.server.once("connection", () => {
//setTimeout(() => {
//liveReloadServer.refresh("/");
// }, 100);
//});

app.get("/", (req, res) => {
  console.log("--------------------");
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      res.status(500).send("Error retrieving users: " + err);
    });
});

// Get Requests
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/user/add.html", (req, res) => {
  res.render("./user/add");
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      res.status(500).send("Error retrieving users: " + err);
    });
});

app.get("/view/:id", (req, res) => {
  // Result is Object
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      res.status(500).send("Error retrieving users: " + err);
    });
});
// Post Requests
app.post("/user/add.html", (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send("Error adding user: " + err);
    });
});

app.post("/search", (req, res) => {
  const searchText = req.body.searchText.trim();
  User.find({$or:[{firstName:searchText},{lastName:searchText}]})
    .then((result) => {
      console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      res.status(500).send("Error adding user: " + err);
    });
});

// Delete Request

app.delete("/edit/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error Deleting the item: " + err);
    });
});

app.put("/edit/:id", (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error Updating the item: " + err);
    });
});
// Database part
mongoose
  .connect(
    "mongodb+srv://yousrike13_db_user:n9dgHsnEiJNT0xP0@cluster0.wezwbsz.mongodb.net/all-data?appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
