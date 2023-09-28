import { useEffect, useState } from "react";
import "./App.css";
import ChartLine from "./components/ChartLine";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App() {
  const [city, setCity] = useState("");
  const [capitalList, setCapitalList] = useState([]);
  const [weatherData, setWeatherData] = useState({ name: "", temperature: [] });
  const [timeData, setTimeData] = useState([]);
  const [apiNewData, setApiNewData] = useState([]);
  const [delay, setDelay] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const cities = data
          .map((country) => {
            return {
              capital: country.capital,
              country: country.translations.fra.common,
            };
          })
          .filter((city) => city.capital !== undefined)
          .sort((a, b) => {
            const capitalA = a.capital[0].toUpperCase();
            const capitalB = b.capital[0].toUpperCase();

            if (capitalA < capitalB) {
              return -1;
            }

            if (capitalA > capitalB) {
              return 1;
            }

            return 0;
          });
        setCapitalList(cities);
      })
      .catch((error) => console.error("Erreur :", error));
  }, []);

  useEffect(() => {
    clearChart()
    if (city) {
      fetch(`http://localhost:8080/weather/${city}`)
        .then((response) => response.json())
        .then((data) => {
          setApiNewData(data);
        });

      if (delay) {
        const interval = setInterval(() => {
          fetch(`http://localhost:8080/weather/${city}`)
            .then((response) => response.json())
            .then((data) => {
              setApiNewData(data);
            });
        }, delay);

        return () => clearInterval(interval);
      }
    }
  }, [city, delay]);

  useEffect(() => {
    setWeatherData({
      name: city,
      temperature: [
        ...weatherData.temperature,
        parseInt(apiNewData.temperature),
      ],
    });
    setTimeData([...timeData, apiNewData.date]);
  }, [apiNewData]);

  const clearChart = () => {
    setTimeData([])
    setWeatherData({city: '', temperature: []})
  }

  const handleChangeCurrentCity = (event) => {
    setCity(event.target.value);
  };
  const handleChangeCurrentDelay = (event) => {
    console.log(parseInt(event.target.value));
    setDelay(event.target.value);
  };

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city}
              label="city"
              onChange={handleChangeCurrentCity}
            >
              {capitalList.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.capital}
                >{`${item.capital} ( ${item.country} )`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Delay</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={delay}
              label="delay"
              onChange={handleChangeCurrentDelay}
            >
              <MenuItem value="3000">3 seconds</MenuItem>
              <MenuItem value="10000">10 seconds</MenuItem>
              <MenuItem value="100000">1 minute</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {timeData && weatherData && (
        <ChartLine timeData={timeData} weatherData={weatherData} />
      )}
    </div>
  );
}

export default App;
