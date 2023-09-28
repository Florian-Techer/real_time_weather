const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/weather/:city", (req, res) => {
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const city = req.params.city;
  const params = {
    access_key: "ba34761150450e66557c0040a2bba463",
    query: city,
  };

  axios
    .get("http://api.weatherstack.com/current", { params })
    .then((response) => {
      const apiResponse = response.data;
      const data = {
        temperature: apiResponse.current.temperature,
        date: formatDate(new Date()),
      };
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
