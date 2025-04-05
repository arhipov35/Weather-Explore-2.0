import React, { useState } from "react";
import { CustomInput } from "../../shared/CustomInput/CustomInput";
import { useWeather } from "../../../contexts/WeatherContext";
import "./UpdateCard.scss";

interface UpdateCardProps {
    onCancel: () => void;
    cityId: string;
    currentCity?: string;
}

export default function UpdateCard({ onCancel, cityId, currentCity = "" }: UpdateCardProps) {
    const [cityInput, setCityInput] = useState<string>("");
    const [localError, setLocalError] = useState<string>("");
    const { updateCity, setError } = useWeather();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityInput(e.target.value);
        if (localError) {
            setLocalError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cityInput.trim()) {
            await handleUpdateCity(cityInput);
        }
    };


    const handleUpdateCity = async (city: string) => {
        if (city.trim()) {
            try {
                setError("");
                const result = await updateCity(cityId, city);
                if (typeof result === 'string') {
                    setLocalError(result);
                    return false;
                } else {
                    onCancel();
                    return true;
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to update the city";
                setLocalError(errorMessage);
                console.error("Error updating city:", err);
                return false;
            }
        }
        return false;
    };

    return (
        <div className="update-card">
            <div className="back-icon-update-card" onClick={onCancel}>
                <img src="/src/assets/img/back.svg" alt="back" />
            </div>
            <form onSubmit={handleSubmit}>
                <CustomInput
                    value={cityInput}
                    onChange={handleInputChange}
                    placeholder={currentCity ? `Current city: ${currentCity}` : "Enter new city name"}
                    error={!!localError}
                    errorMessage={localError}
                    labelText="Change a city"
                    onCitySelect={handleUpdateCity} 
                />
            </form>
        </div>
    );
}