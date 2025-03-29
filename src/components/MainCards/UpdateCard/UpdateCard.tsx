import React, { useState } from "react";
import { CustomInput } from "../../shared/CustomInput/CustomInput";
import { useWeather } from "../../../contexts/WeatherContext";
import "./UpdateCard.scss";

interface UpdateCardProps {
    onCancel: () => void;
    cityId: string;
}

export default function UpdateCard({ onCancel, cityId }: UpdateCardProps) {
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
            try {
                setError("");
                const result = await updateCity(cityId, cityInput);
                if (typeof result === 'string') {
                    setLocalError(result);
                } else {
                    onCancel();
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to update the city";
                setLocalError(errorMessage);
                console.error("Error updating city:", err);
            }
        }
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
                    placeholder="Enter new city name"
                    error={!!localError}
                    errorMessage={localError}
                    labelText="Change a city"
                />
            </form>
        </div>
    );
}