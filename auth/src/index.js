const express = require("express");
const { connectDb } = require("./helpers/db");
const { port, host, db, apiUrl } = require("./configuration");
const axios = require("axios");

const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`On db ${db}`);
  });
};
app.get("/test", (req, res) => {
  res.send("Our auth server is working correctly");
});
app.get("/testwithapidata", (req, res) => {
  axios.get(apiUrl + "/testapidata").then((response) => {
    res.json({
      testapidata: response.data.testwithapi,
    });
  });
});

app.get("/currentUser", (req, res) => {
  res.json({
    id: "1234",
    email: "foo@gmail.com",
  });
});

connectDb()
  .then(() => startServer())
  .catch((err) => console.log(`Server not running. Error message: ${err.message}`));
