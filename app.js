const express = require("express");
const open = require("open");
const home = require("./routes/index");

const port = 3000;
const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static("public"));
app.use("/", home);

app.get("/*", function(req, res) {
  res
    .status(404)
    .send(
      "The page you are looking for does not exist. Please, navigate back to the home page."
    );
});

app.listen(port, function(err) {
  if (err) {
    alert("There was an error connecting to port: " + port + "\n" + err);
  } else {
    open("http://localhost:" + port);
  }
});

module.exports = app;
