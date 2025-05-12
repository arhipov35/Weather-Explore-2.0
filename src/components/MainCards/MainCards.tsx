import React, { useState, useMemo } from "react";
import { WeatherCard } from "./WeatherCard/WeatherCard";
import { CardHover } from "./CardHover/CardHover";
import { useWeather } from "../../contexts/WeatherContext";
import { AddCard } from "./AddCard/AddCard";
import "./MainCards.scss";




function MainCardsComponent() {
  const { cities, deleteCity } = useWeather();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const cityMap = useMemo(() => 
    new Map(cities.map((city) => [city.index, city])),
    [cities]
  );
  
  return (
    <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-xs-1 g-4" >
      {Array.from({ length: 8 }).map((_, index) => {
        const city = cityMap.get(index);
        return (
          <div key={index} className={`${cities.length - index <= 2 ? 'mx-auto' : ''}`}>
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
    </div>
  );
}

export const MainCards = React.memo(MainCardsComponent);
