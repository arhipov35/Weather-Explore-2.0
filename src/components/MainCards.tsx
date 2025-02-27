import React, { useState } from "react";

interface WeatherData {
  city: {
    name: string;
  };
  list: Array<{
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
}

interface City {
  id: string;
  name: string;
  index: number;
  weatherData?: {
    city: {
      name: string;
    };
    list: Array<any>;
  };
}

interface MainCardsProps {
  cities: City[];
  onSubmit: (cityName: string, index: number) => void;
  loading: boolean;
}

export function MainCards({ cities, onSubmit, loading }: MainCardsProps) {
  const [cityInputs, setCityInputs] = useState<string[]>(Array(8).fill(""));
  console.log(cityInputs);

  const handleSubmit = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    if (cityInputs[index].trim()) {
      onSubmit(cityInputs[index], index);
      setCityInputs((prev) => {
        const newInputs = [...prev];
        newInputs[index] = "";
        return newInputs;
      });
    }
  };

  const handleInputChange = (value: string, index: number) => {
    setCityInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });
  };
  
  const cityMap = new Map(cities.map((city) => [city.index, city]));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => {
        const city = cityMap.get(index);
        return (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            {city && city.weatherData ? (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">
                  {city.weatherData.city.name}
                </h2>
                <p>Temperature: {city.weatherData.list[0].main.temp}°C</p>
                <p>Weather: {city.weatherData.list[0].weather[0].main}</p>
                <p>Wind: {city.weatherData.list[0].wind.speed} m/s</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => handleSubmit(e, index)}
                className="space-y-3"
              >
                <input
                  type="text"
                  value={cityInputs[index]}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  placeholder="Enter city name"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                >
                  {loading ? "Adding..." : "Add City"}
                </button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
}
