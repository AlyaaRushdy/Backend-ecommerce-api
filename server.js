require("dotenv").config();

const express = require("express"),
  app = express(),
  mongoose = require("mongoose");

const port = process.env.port || 5000,
  db_url = process.env.db_url;

// db connection
mongoose.connect(db_url);
const { connection } = mongoose;
connection.once("open", () => {
  console.log("databese connected successfully");
});
connection.on("error", (err) => {
  console.log("databese connection failed");
  console.log("error: ", err);
});

// json parsing
app.use(express.json());

// routing
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
