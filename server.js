const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT;

const DBURL = process.env.DB_CONNECTION_URL;

mongoose
  .connect(DBURL)
  .then(() => console.log("Conected"))
  .catch(() => {
    console.log("Failed");
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
