const express = require("express");
const api = require("./routes/api");
const app = express();
app.use(express.json());
app.use("/api", api);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
