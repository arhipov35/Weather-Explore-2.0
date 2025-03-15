import React, { useState } from "react";
import { WeatherData } from "../../services/openWeather";
import { CustomInput } from "../shared/CustomInput/CustomInput";
import { WeatherCard } from "./WeatherCard/WeatherCard";
import { CardHover } from "./CardHover/CardHover";
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
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

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
              <WeatherCard weatherData={city.weatherData} />
            ) : hoverIndex === index ? (
              <form onSubmit={(e) => handleSubmit(e, index)}>
                <CustomInput
                  value={cityInputs[index]}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  placeholder="Enter city name"
                />
              </form>
            ) : (
              <CardHover onClick={() => setHoverIndex(index)} />
            )}
          </div>
        );
      })}
    </section>
  );
}
