import React, { useState } from "react";
import { WeatherData } from "../../services/openWeather";
import { CustomInput } from "../shared/CustomInput/CustomInput";
import "./MainCards.scss";
interface City {
  id: string;
  index: number;
  weatherData?: WeatherData;
}

interface MainCardsProps {
  cities: City[];
  onSubmit: (cityName: string, index: number) => void;
  loading: boolean;
}

export function MainCards({ cities, onSubmit }: MainCardsProps) {
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
    <section className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-xs-1 g-4">
      {Array.from({ length: 8 }).map((_, index) => {
        const city = cityMap.get(index);
        return (
          <div key={index}>
            {city && city.weatherData ? (
              <div className="main-card">
                <div className="main-card-data">
                  <h5 className="main-card-city-name">
                    {city.weatherData.city.name}
                  </h5>
                  <div className="main-card-indicators">
                    <h1 className="main-card-indicators-temp">
                      {Math.round(city.weatherData.list[0].main.temp)}°
                    </h1>
                    <div className="main-card-indicators-state">
                      <p className="main-card-caption">
                        {city.weatherData.list[0].weather[0].main}
                      </p>
                      <div className="main-card-indicators-state-feels">
                        <p className="main-card-caption">Feeling like </p>
                        <p className="main-card-feels">
                          {Math.round(city.weatherData.list[0].main.feels_like)}
                          °
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e, index)}>
                <CustomInput
                  value={cityInputs[index]}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  placeholder="Enter city name"
                />
              </form>
            )}
          </div>
        );
      })}
    </section>
  );
}
