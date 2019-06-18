const express = require("express");
const bodyParser = require("body-parser");
const swagger = require("swagger-spec-express");
const packageJson = require("./package.json");

// swaggerOptions
var options = {
  title: "WIKI API",
  version: "1.0.0",
  description: "API to maintain WIKI type articles",
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  contact: {
    name: "David Rey",
    url: "NA",
    email: "NA"
  }
};

//Manage Routes
const routes = require("./routes/routes");

//Connect to mongodb using mongoose
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/wikidb", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
//Required so Find and Modify can be use with mongoose
mongoose.set("useFindAndModify", false);

//Set up app
const app = express();
app.use(bodyParser.json());

//Add routes on /api route
app.use("/api", routes);

//Initialise swagger
swagger.initialise(app, options);

//redirect / to api-docs
app.get("/", (req, reply) => {
  reply.status(200).redirect("/api-docs");
});

//Run server
swagger.compile();
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
