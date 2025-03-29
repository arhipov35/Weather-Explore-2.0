import { useState } from "react";
import { FirstCard } from "../../components/FirstCard/FirstCard";
import { MainCards } from "../../components/MainCards/MainCards";
import { useWeather } from "../../contexts/WeatherContext";
import "./HomePage.scss";

export function HomePage() {
  const { 
    isInitialView, 
    isInitialLoading, 
    addCity, 
    error, 
    loading,
    setError 
  } = useWeather();
  const [cityInput, setCityInput] = useState<string>("");

  // Handle input change
  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityInput(value);
    setError("");
  };

  return (
    <section className="container-fluid page">
      {isInitialLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading your weather cards...</p>
        </div>
      ) : isInitialView ? (
        <FirstCard
          onSubmit={(e) => {
            e.preventDefault();
            addCity(cityInput, 0);
          }}
          cityInput={cityInput}
          onCityInputChange={handleCityInputChange}
          loading={loading}
          error={error}
        />
      ) : (
        <MainCards />
      )}
    </section>
  );
}
