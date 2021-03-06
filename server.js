const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(process.env.PORT || 3000);
