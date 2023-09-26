import { useEffect, useState } from "react";
import "./App.css";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App() {
  const [city, setCity] = useState("");
  const [capitalList, setCapitalList] = useState([]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const cities = data
          .map((country) => country.capital)
          .filter((city) => city !== undefined)
          .sort();
        setCapitalList(cities);
      })
      .catch((error) => console.error("Erreur :", error));
  }, []);
  return (
    <div className="App">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="citys"
            onChange={handleChange}
          >
            {capitalList.map((capital, index) => {
              return (
                <MenuItem key={index} value={capital}>{capital}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default App;
