import { useSelector } from "react-redux";
import { Paper, Box, IconButton, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { RootState } from "../store/store";
import { WeatherForecastNode } from "../types";

import "swiper/css";

const ForecastList: React.FC = () => {
  const forecast = useSelector((state: RootState) => state.weather.forecast);

  if (!forecast) {
    return null;
  }

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
      <Box
        className="forecast"
        sx={{ paddingRight: "50px", paddingLeft: "50px", position: "relative" }}
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={5}
          scrollbar={{ draggable: true }}
          navigation={{
            prevEl: ".forecast-button-prev",
            nextEl: ".forecast-button-next",
          }}
        >
          {forecast.map((hour: WeatherForecastNode) => {
            const date = new Date(hour.timestamp * 1000);
            const timeString = date.toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            });

            const isMidnight = timeString === "00:00";

            return (
              <SwiperSlide
                key={hour.timestamp}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: "14px",
                  minHeight: "50px",
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {isMidnight && (
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 700,
                        textTransform: "uppercase",
                        mr: "5px",
                      }}
                    >
                      {date.toLocaleDateString("ru-RU", { weekday: "short" })}
                    </Box>
                  )}
                  {timeString}
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {hour.temperature}°C
                </Typography>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <IconButton
          className="forecast-button-prev"
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 0,
            border: "1px solid",
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          className="forecast-button-next"
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: 0,
            border: "1px solid",
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ForecastList;
