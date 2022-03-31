const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;
const goalRouter = require("./routes/goalRoutes");

app.use("/api", goalRouter);

app.listen(port, () => {
  console.log(`Listing On ${port}`);
});
