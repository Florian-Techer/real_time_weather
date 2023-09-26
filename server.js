const express = require("express");
const axios = require('axios');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/weather", (req, res) => {
  const params = {
    access_key: "ba34761150450e66557c0040a2bba463",
    query: "New York",
  };

  axios
    .get("http://api.weatherstack.com/current", { params })
    .then((response) => {
      const apiResponse = response.data;
      console.log(response)
      res.send(apiResponse);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
