import { useState } from "react";
import { FirstCard } from "../../components/FirstCard/FirstCard";
import { MainCards } from "../../components/MainCards/MainCards";
import { useWeather } from "../../contexts/WeatherContext";
import Loader from "../../components/shared/Loader/Loader";
import "./HomePage.scss";

export function HomePage() {
  const { isInitialView, isInitialLoading, addCity, error, loading, setError } =
    useWeather();
  const [cityInput, setCityInput] = useState<string>("");

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityInput(value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCitySelect(cityInput);
  };

  const handleCitySelect = async (city: string) => {
    if (city.trim()) {
      const errorMessage = await addCity(city, 0);
      setCityInput("");
      if (errorMessage) {
        setError(errorMessage);
      }
    }
  };

  return (
    <section className="container-fluid page">
      {isInitialLoading ? (
        <Loader fullScreen text="Loading your weather cards..." />
      ) : isInitialView ? (
        <FirstCard
          onSubmit={handleSubmit}
          cityInput={cityInput}
          onCityInputChange={handleCityInputChange}
          loading={loading}
          error={error}
          onCitySelect={handleCitySelect}
        />
      ) : (
        <MainCards />
      )}
    </section>
  );
}
