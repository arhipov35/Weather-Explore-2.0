import React, { useEffect, useState } from "react";
import "./CustomInput.scss";
import country from "../../../assets/data/countries.json";
interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  labelText?: string;
  onCitySelect?: (city: string) => void;
}
interface Country {
  [country: string]: string[] | undefined;
}
export function CustomInput({
  value,
  onChange,
  placeholder = "",
  className = "",
  type = "text",
  error = false,
  errorMessage = "No city found",
  labelText = "Add a city",
  onCitySelect,
}: CustomInputProps) {
  const [cities, setCities] = useState<Country>({});
  useEffect(() => {
    // Якщо поле введення порожнє, очищуємо результати
    if (!value.trim()) {
      setCities({});
      return;
    }

    // Фільтруємо міста за введеним текстом
    const results: Country = {};

    for (const [countryName, cityList] of Object.entries(country)) {
      if (cityList) {
        const matches = cityList.filter(city =>
          city.toLowerCase().startsWith(value.toLowerCase())
        );

        if (matches.length > 0) {
          results[countryName] = matches;
        }
      }
    }

    setCities(results);
  }, [value]);
  return (
    <div className="card-field">
      <p className="label">{labelText}</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`custom-input ${className} ${error ? "error-border" : ""}`}
      />
      {Object.keys(cities).length > 0 && (
        <div className="list">
          <ul>
            {Object.entries(cities).map(([country, cityList]) => (
              cityList && cityList.map((city) => (
                <li 
                  key={`${country}-${city}`} 
                  onClick={() => {
                    // Змінюємо значення поля введення
                    onChange({ target: { value: city } } as any);
                    
                    // Якщо є функція onCitySelect, викликаємо її
                    if (onCitySelect) {
                      onCitySelect(city);
                    }
                  }}
                >
                  {city}, {country}
                </li>
              ))
            ))}
          </ul>
        </div>
      )}
      <p className={`caption ${error ? "error" : ""}`}>
        {error ? errorMessage : "Choose your location"}
      </p>
    </div>
  );
}
