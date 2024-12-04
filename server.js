const express = require("express");
const app = express();
const mongodb = require("./data/database");
const port = process.env.PORT || 3000;

app.use(express.json());

const routes = require("./routes");
app.use("/", routes);

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

//Initializing Database and node app
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
