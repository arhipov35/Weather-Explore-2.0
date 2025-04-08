import { WeatherData } from "../../../types/weather.types";
import { WeatherIcon } from "../../shared/WeatherIcon/WeatherIcon";
import "./ForecastCard.scss";

interface ForecastCardProps {
  onCancel: () => void;
  weather: WeatherData;
}

interface DailyForecast {
  date: string;
  dayName: string;
  temp: number;
  feels_like: number;
  weatherMain: string;
}

function ForecastCard({ onCancel, weather }: ForecastCardProps) {
  const getNext4DaysForecast = (): DailyForecast[] => {
    const dailyForecasts: { [key: string]: DailyForecast } = {};
    weather.list.forEach((item, index) => {
      if (index === 0) return;

      const date = new Date(item.dt * 1000);

      const dateString = date.toISOString().split("T")[0];

      if (
        !dailyForecasts[dateString] ||
        (date.getHours() >= 12 && date.getHours() <= 15)
      ) {
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        dailyForecasts[dateString] = {
          date: dateString,
          dayName: dayNames[date.getDay()],
          temp: item.main.temp,
          feels_like: item.main.feels_like,
          weatherMain: item.weather[0].main,
        };
      }
    });

    return Object.values(dailyForecasts).slice(0, 4);
  };

  const forecastData = getNext4DaysForecast();

  return (
    <>
      <div className="forecast">
        <div className="forecast__back-btn" onClick={onCancel}>
          <img src="/src/assets/img/back.svg" alt="back" />
        </div>
        {forecastData.map((day, index) => (
          <div key={index} className="forecast__day">
            <h5 className="forecast__date">
              {day.dayName}, {new Date(day.date).toLocaleDateString()}
            </h5>
            <div className="forecast__info">
              <h1 className="forecast__temp">{Math.round(day.temp)}°</h1>
              <div className="forecast__details">
                <p className="forecast__condition">{day.weatherMain}</p>
                <div className="forecast__feels">
                  <p className="forecast__feels-label">Feeling like</p>
                  <p className="forecast__feels-value">
                    {Math.round(day.feels_like)}°
                  </p>
                </div>
              </div>
              <div className="forecast__icon">
                <WeatherIcon
                  width={"auto"}
                  height={3}
                  description={day.weatherMain}
                ></WeatherIcon>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ForecastCard;
