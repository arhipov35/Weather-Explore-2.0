import { useState } from "react";
import { WeatherData } from "../../../services/openWeather";
import { WeatherIcon } from "../../shared/WeatherIcon/WeatherIcon";
import { DeleteCard } from "../DeleteCard/DeleteCard";
import "./WeatherCard.scss";
import UpdateCard from "../UpdateCard/UpdateCard";
import ForecastCard from "../ForecastCard/ForecastCard";

interface WeatherCardProps {
  weatherData: WeatherData;
  onDelete?: () => void;
  cityId: string;
}

export function WeatherCard({
  weatherData,
  onDelete,
  cityId,
}: WeatherCardProps) {
  const [showDeleteCard, setShowDeleteCard] = useState<boolean>(false);
  const [showUpdateCard, setShowUpdateCard] = useState<boolean>(false);
  const [showForecastCard, setShowForecastCard] = useState<boolean>(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setShowDeleteCard(false);
  };

  if (showDeleteCard) {
    return (
      <DeleteCard
        onCancel={() => setShowDeleteCard(false)}
        onDelete={handleDelete}
      />
    );
  }

  if (showUpdateCard) {
    return (
      <UpdateCard onCancel={() => setShowUpdateCard(false)} cityId={cityId} />
    );
  }

  if (showForecastCard) {
    return (
      <ForecastCard
        onCancel={() => setShowForecastCard(false)}
        weather={weatherData}
      />
    );
  }

  return (
    <div className="main-card">
      <div className="card-navigation">
        <div
          className="card-navigation-icon"
          onClick={() => setShowUpdateCard(true)}
        >
          <img src="/src/assets/img/edit.svg" alt="edit" />
        </div>
        <div
          className="card-navigation-icon"
          onClick={() => setShowForecastCard(true)}
        >
          <img src="/src/assets/img/forecast.svg" alt="forecast" />
        </div>
        <div
          className="card-navigation-icon"
          onClick={() => setShowDeleteCard(true)}
        >
          <img src="/src/assets/img/delete.svg" alt="delete" />
        </div>
      </div>
      <div className="main-card-data">
        <h5 className="main-card-city-name">{weatherData.city.name}</h5>
        <div className="main-card-indicators">
          <h1 className="main-card-indicators-temp">
            {Math.round(weatherData.list[0].main.temp)}°
          </h1>
          <div className="main-card-indicators-state">
            <p className="main-card-caption">
              {weatherData.list[0].weather[0].main}
            </p>
            <div className="main-card-indicators-state-feels">
              <p className="main-card-caption">Feeling like </p>
              <p className="main-card-feels">
                {Math.round(weatherData.list[0].main.feels_like)}°
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-card-photo">
        <div className="main-card-photo-icon">
          <WeatherIcon
            description={weatherData.list[0].weather[0].main}
          ></WeatherIcon>
        </div>
      </div>
      <div className="main-card-hum-wind">
        <div className="container-hum-wind">
          <div className="hum-wind">
            <img
              className="icon-hum-wind"
              src="/src/assets/img/humidity.svg"
              alt=""
            />
            <p className="caption-hum-wind">Humidity</p>
          </div>
          <h4 className="interest-hum-wind">
            {weatherData.list[0].main.humidity}%
          </h4>
        </div>
        <div className="container-hum-wind">
          <div className="hum-wind">
            <img
              className="icon-hum-wind"
              src="/src/assets/img/wind.svg"
              alt=""
            />
            <p className="caption-hum-wind">Wind</p>
          </div>
          <div className="interest-hum-wind-container">
            <h4 className="interest-hum-wind">
              {Math.round(weatherData.list[0].wind.speed)} m/s
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
