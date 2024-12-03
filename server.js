const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const mongodb = require("./data/database");

const PORT = process.env.PORT || 3000;
const routes = require("./routes");

// app.use(express.json());
app.use(bodyParser.json());
app.use("/", routes);

mongodb.initDb((error) => {
  if (error) {
      console.log("Error connecting to database");
  } else {
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      });
  }
});