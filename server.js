var express = require("express");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

// Handlebars
var exphbs = require("express-handlebars");


// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Setting up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Make public a static folder
app.use(express.static("./public"));

// Connect to MongoDB --- NewsScrape
mongoose.connect("mongodb://localhost/NewsScrape", { useNewUrlParser: true });

// A GET route for scraping Medium
app.get("/scrape", function(req, res) {
  axios.get("https://medium.com/").then(function(response) {

  // Data gets loaded into cherrio.
  var $ = cheerio.load(response.data);

    // Taking h2 within the articlea,then....
    $("article h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Articles.create(result)
        .then(function(dbArticles) {
          // View the added result in the console
          console.log(dbArticles);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// Routes
app.get('/', function (req, res) {
    res.render('index', res); 
});


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  