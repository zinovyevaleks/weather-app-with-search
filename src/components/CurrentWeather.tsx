import { useSelector } from "react-redux";
import { Box, Paper, Typography } from "@mui/material";
import { translateCondition } from "../utils/translateCondition";
import { RootState } from "../store/store";

const CurrentWeather: React.FC = () => {
  const current = useSelector((state: RootState) => state.weather.current);

  if (!current) {
    return null;
  }

  return (
    <Paper elevation={6} sx={{ marginTop: 4, padding: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 4,
        }}
      >
        <img src={current.icon} alt="Weather Icon" style={{ width: "100px" }} />
        <Typography variant="h2">{current.c}°C</Typography>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        {translateCondition(current.condition)}
      </Typography>
    </Paper>
  );
};

export default CurrentWeather;
