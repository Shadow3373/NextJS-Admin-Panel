const express = require("express");
const path = require("node:path");
const connection = require("./src/config/connection");
const userRoute = require("./src/routes/user.route");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(
  cors([
    {
      origin: "https://nextadminpanelv1.netlify.app",
    },
  ])
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

connection();

app.use("/api/v2/user", userRoute);
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running on ${process.env.URL}${process.env.PORT}`)
);
