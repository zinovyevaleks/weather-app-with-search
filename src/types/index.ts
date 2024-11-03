export type WeatherNow = {
  c: number;
  icon: string;
  condition: string;
};

export type WeatherForecastNode = {
  timestamp: number;
  temperature: number;
};

export type WeatherForecast = {
  hours: {
    edges: { node: WeatherForecastNode }[];
  };
};

export type WeatherState = {
  current: WeatherNow | null;
  forecast: WeatherForecastNode[];
  coordinates: Coordinates | null;
  cityName: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type Coordinates = {
  lat: number;
  lon: number;
};
