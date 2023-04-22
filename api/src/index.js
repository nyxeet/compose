const express = require("express");
const { connectDb } = require("./helpers/db");
const { port, host, db, authApiUrl } = require("./configuration");
const mongoose = require("mongoose");
const axios = require("axios");

const postSchema = new mongoose.Schema({
  name: String,
});

const Post = mongoose.model("Post", postSchema);
const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`On db ${db}`);
  });
};
app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

app.get("/testapidata", (req, res) => {
  res.json({ testwithapi: true });
});

app.get("/testwithcurrentuser", (req, res) => {
  axios.get(authApiUrl + "/currentUser").then((response) => {
    res.json({ testwithcurrentuser: true, currenyUserFromAuth: response.data });
  });
});

connectDb()
  .then(() => startServer())
  .catch((err) => console.log(`Server not running. Error message: ${err.message}`));
