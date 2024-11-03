import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Paper } from "@mui/material";
import { fetchCoordinates, fetchWeather } from "../store/weatherSlice";
import { RootDispatch } from "../store/store";

const SearchBar: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const dispatch: RootDispatch = useDispatch();

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleCitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city) {
      const coordinates = await dispatch(fetchCoordinates(city)).unwrap();

      if (coordinates) {
        dispatch(fetchWeather(coordinates));
      }
    }

    setCity("");
  };

  return (
    <Paper
      elevation={6}
      sx={{ paddingTop: 3, paddingBottom: 3, paddingLeft: 1, paddingRight: 1 }}
    >
      <Box
        component="form"
        onSubmit={handleCitySubmit}
        sx={{ display: "flex", gap: 2 }}
      >
        <TextField
          label="Введите город"
          variant="outlined"
          value={city}
          onChange={handleCityChange}
          fullWidth
        />
        <Button type="submit" variant="contained">
          Поиск
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchBar;
