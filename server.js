const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const mongodb = require("./data/database");

const PORT = process.env.PORT || 3000;
const routes = require("./routes");

// app.use(express.json());
app.use(bodyParser.json())
    .use("/", routes);

process.on("uncaughtException", (err, origin) => {
    console.log(
      process.stderr.fd,
      `Caught exception: ${err}\n` + `Exception origin: ${origin}`
    );
  });

mongodb.initDb((error) => {
  if (error) {
      console.log("Error connecting to database");
  } else {
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      });
  }
});