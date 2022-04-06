const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

//Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Listing On ${port}`);
});
