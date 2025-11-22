const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");

-
app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});



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