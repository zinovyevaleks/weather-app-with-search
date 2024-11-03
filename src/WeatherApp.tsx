import { useSelector } from "react-redux";
import { Box, CssBaseline, Container, Paper } from "@mui/material/";
import SearchBar from "./components/SearchBar";
import CityName from "./components/CityName";
import CurrentWeather from "./components/CurrentWeather";
import ForecastList from "./components/ForecastList";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import { RootState } from "./store/store";

function WeatherApp() {
  const { status } = useSelector((state: RootState) => state.weather);

  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundColor: "primary.light", height: "100vh" }}>
        <Container
          maxWidth="sm"
          sx={{
            paddingTop: 4,
            paddingBottom: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Paper elevation={16} sx={{ padding: 3, maxHeight: "100%" }}>
            <SearchBar />
            {status === "loading" && <Loading />}
            {status === "failed" && <ErrorMessage />}
            {status === "succeeded" && (
              <>
                <CityName />
                <CurrentWeather />
                <ForecastList />
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default WeatherApp;
