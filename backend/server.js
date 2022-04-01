const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const colos = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Listing On ${port}`);
});
