import { useSelector } from "react-redux";
import { Paper, Typography } from "@mui/material";
import { RootState } from "../store/store";

const CityName: React.FC = () => {
  const cityName = useSelector((state: RootState) => state.weather.cityName);

  return (
    <Paper
      elevation={6}
      sx={{
        marginTop: 4,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      <Typography component="h1" variant="h3" sx={{ textAlign: "center" }}>
        {cityName}
      </Typography>
    </Paper>
  );
};

export default CityName;
