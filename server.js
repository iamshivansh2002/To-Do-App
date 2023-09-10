require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const mongoose = require("mongoose");

app.use(express.json());
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/todos"));

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `mongodb connection establish\nserver is running on PORT ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
