const express = require("express");
const path = require("node:path");
const connection = require("./src/config/connection");
const userRoute = require("./src/routes/user.route");
// const logger = require("./config/logger");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(
  cors([
    {
      origin: "http://192.168.1.100:3000",
    },
  ])
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

// function errorHandler(err, req, res, next) {
//   logger.info("Error:", {
//     message: err.message,
//     stack: err.stack,
//     method: req.method,
//     url: req.url,
//   });

//   res.status(500).json({ error: "Internal Server Error" });
// }
connection();

app.use("/user", userRoute);

app.use("/admin", (req, res) =>
  res.sendFile(path.join(__dirname, "index.html"))
);
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "404.html")));

// app.use(errorHandler);

/* Server Listening to port */
// const PORT = process.env.PORT || 5000;
// const URL = process.env.BASEURL || "https://localhost:";
// app.listen(PORT, console.log(`server running on ${URL}${PORT}`));
