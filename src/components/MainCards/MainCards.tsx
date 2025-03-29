import { useState } from "react";
import { WeatherCard } from "./WeatherCard/WeatherCard";
import { CardHover } from "./CardHover/CardHover";
import { AddCard } from "./AddCard/AddCard";
import { useWeather } from "../../contexts/WeatherContext";
import "./MainCards.scss";

export function MainCards() {
  const { cities, deleteCity } = useWeather();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const cityMap = new Map(cities.map((city) => [city.index, city]));
  return (
    <section className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-xs-1 g-4">
      {Array.from({ length: 8 }).map((_, index) => {
        const city = cityMap.get(index);
        return (
          <div key={index}>
            {city && city.weatherData ? (
              <WeatherCard 
                weatherData={city.weatherData} 
                onDelete={() => deleteCity(city.id)}
                cityId={city.id}
              />
            ) : hoverIndex === index ? (
              <AddCard
                index={index}
                onCancel={() => setHoverIndex(null)}
              />
            ) : (
              <CardHover onClick={() => setHoverIndex(index)} />
            )}
          </div>
        );
      })}
    </section>
  );
}
