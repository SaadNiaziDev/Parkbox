const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
let httpResponse = require("express-http-response");

dotenv.config({ path: "./config/config.env" });
const app = express();

const authRoute = require("./routes");

require("./models/User");

//database connection
mongoose.connect(
    process.env.DB_URL,
    () => {
      console.log('Connected to MongoDB');
    }
  );

//middleware
app.use(express.json());

//route middleware
app.use(authRoute);

app.use(httpResponse.Middleware)

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});