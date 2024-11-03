import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import client from "../ApolloClient";
import { getCoordinatesForCity } from "../utils/getCoordinatesForCity";
import { WeatherState, WeatherForecastNode, Coordinates } from "../types";

const initialState: WeatherState = {
  current: null,
  forecast: [],
  coordinates: null,
  cityName: "",
  status: "idle",
  error: null,
};

// Action для получения данных координат по названию города
export const fetchCoordinates = createAsyncThunk<Coordinates | null, string>(
  "weather/fetchCoordinates",
  async (cityName: string) => {
    const coordinates = await getCoordinatesForCity(cityName);

    return coordinates;
  }
);

// Action для получения данных о погоде и прогнозе
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const GET_WEATHER_FORECAST = gql`
      query GetWeatherForecast {
        weatherByPoint(request: { lat: ${lat}, lon: ${lon} }) {
          now {
            c: temperature
            icon(format: SVG)
            condition
          }
          forecast {
            hours(first: 48) {
              edges {
                node {
                  timestamp
                  temperature
                }
              }
            }
          }
        }
      }
    `;

    const response = await client.query({
      query: GET_WEATHER_FORECAST,
    });
    return response.data.weatherByPoint;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoordinates.fulfilled, (state, action) => {
        state.coordinates = action.payload;
        state.cityName = action.meta.arg;
      })
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload.now;
        state.forecast = action.payload.forecast.hours.edges.map(
          (edge: { node: WeatherForecastNode }) => edge.node
        );
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default weatherSlice.reducer;
