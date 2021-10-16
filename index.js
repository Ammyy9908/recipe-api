const express = require("express");
const connectDB = require("./utility/db");
const api = require("./routes/api");
const auth = require("./routes/auth");
const app = express();
app.use(express.json());

// make a db connection

connectDB()
  .then((connection) => {
    if (connection) {
      console.log("Database connection established");
    }
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", api);
app.use("/auth", auth);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
