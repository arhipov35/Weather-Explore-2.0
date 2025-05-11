import React, { useState } from "react";
import { CustomInput } from "../../shared/CustomInput/CustomInput";
import { useWeather } from "../../../contexts/WeatherContext";
import "./AddCard.scss";
import { BackIcon } from "../../shared/icons";

interface AddCardProps {
  index: number;
  onCancel: () => void;
}

export function AddCard({ index, onCancel }: AddCardProps) {
  const [cityInput, setCityInput] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const { addCity } = useWeather();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityInput(value);
    if (localError) {
      setLocalError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      await handleAddCity(cityInput);
    }
  };

  const handleAddCity = async (city: string) => {
    if (city.trim()) {
      try {
        const result = await addCity(city, index);
        if (typeof result === 'string') {
          setLocalError(result);
          return false;
        } else {
          setCityInput(""); 
          return true;
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to add the city";
        setLocalError(errorMessage);
        console.error("Error adding city:", err);
        return false;
      }
    }
    return false;
  };

  return (
    <div className="add-card">
      <div className="back-icon-add-card" onClick={onCancel}>
        <BackIcon />
      </div>
      <form onSubmit={handleSubmit}>
        <CustomInput
          value={cityInput}
          onChange={handleInputChange}
          placeholder="Enter city name"
          error={!!localError}
          errorMessage={localError}
          onCitySelect={handleAddCity} 
        />
      </form>
    </div>
  );
}
