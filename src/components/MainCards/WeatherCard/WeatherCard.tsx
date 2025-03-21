import { WeatherData } from "../../../services/openWeather";
import { WeatherIcon } from "../../shared/WeatherIcon/WeatherIcon";
import "./WeatherCard.scss";

interface WeatherCardProps {
  weatherData: WeatherData;
}

export function WeatherCard({ weatherData }: WeatherCardProps) {
  return (
    <div className="main-card">
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
