const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000; // eslint-disable-line no-undef

app.use(express.json());

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
