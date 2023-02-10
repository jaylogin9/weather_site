const express = require("express");
const app = express();
const requests = require("requests"); // <-- typo error, should be "request" not "requests"
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const template = path.join(__dirname, "/templates");
app.set("views", template);

app.get("/", (req, res) => {
  res.render("index.hbs");
});

  // Render the Display.hbs Page.
app.post("/info", async (req, res) => {
  let city = req.body.nameCity;
  const apiKey =process.env.API;
  // fetch the response from the link.
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&&lang=hi&appid=${apiKey}`;
  requests(url)
    .on("data", (chunk) => {
      const jsonData = JSON.parse(chunk);
      //console.log(jsonData);
      res.render("display.hbs", { data: jsonData });
    })

    .on("end", function (err) {
      if (err) return console.log("connection closed due to errors", err);
      
    });
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}` );
});
