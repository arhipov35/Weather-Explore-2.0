import React, { useEffect, useState, useMemo } from "react";
import { debounce } from 'lodash';
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

  const debouncedSearch = useMemo(
    () =>
      debounce((searchValue: string) => {
        if (!searchValue.trim()) {
          setCities({});
          return;
        }

        const results: Country = {};
        const searchLower = searchValue.toLowerCase();

        for (const [countryName, cityList] of Object.entries(country)) {
          if (cityList) {
            const matches = cityList.filter(city =>
              city.toLowerCase().startsWith(searchLower)
            );

            if (matches.length > 0) {
              results[countryName] = matches;
            }
          }
        }

        setCities(results);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(value);

    
    return () => {
      debouncedSearch.cancel();
    };
  }, [value, debouncedSearch]);

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
                  onClick={() => { onCitySelect?.(city) }}
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
