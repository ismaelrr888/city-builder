"use client";

import React, { useState, useEffect } from "react";

const countries = [
  { name: "Sofia", latitude: 42.6977, longitude: 23.3219 },
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
  { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
];

const getWeatherCondition = (weathercode: number) => {
  if (weathercode === 0) return "sunny";
  if (weathercode >= 1 && weathercode <= 3) return "partly cloudy";
  if (weathercode >= 45 && weathercode <= 48) return "foggy";
  if (weathercode >= 51 && weathercode <= 67) return "drizzle";
  if (weathercode >= 71 && weathercode <= 77) return "snow";
  if (weathercode >= 80 && weathercode <= 82) return "rain showers";
  if (weathercode >= 85 && weathercode <= 86) return "snow showers";
  if (weathercode >= 95 && weathercode <= 99) return "thunderstorm";
  return "unknown";
};

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case "sunny":
      return <span>☀️</span>;
    case "rain showers":
    case "drizzle":
      return <span>🌧️</span>;
    case "snow":
    case "snow showers":
      return <span>❄️</span>;
    default:
      return <span>☁️</span>;
  }
};

const WeatherComponent: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async (latitude: number, longitude: number) => {
    const weatherApi =
      process.env.NEXT_PUBLIC_WEATHER_API || "https://api.open-meteo.com/v1";

    const response = await fetch(
      `${weatherApi}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const data = await response.json();
    setWeather(data.current_weather);
  };

  useEffect(() => {
    fetchWeather(selectedCountry.latitude, selectedCountry.longitude);
  }, [selectedCountry]);

  const weatherCondition = weather
    ? getWeatherCondition(weather.weathercode)
    : "unknown";

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedCountry.name}
        onChange={(e) => {
          const country = countries.find((c) => c.name === e.target.value);
          if (country) setSelectedCountry(country);
        }}
        className="border p-2 rounded"
      >
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      {weather && (
        <div className="flex items-center">
          <WeatherIcon condition={weatherCondition} />
          <span className="ml-2 text-xl">{weather.temperature}°C</span>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
