import React from "react";
import "./FirstCard.scss";
import { CustomInput } from "../shared/CustomInput/CustomInput";

interface FirstCardProps {
  onSubmit: (e: React.FormEvent) => void;
  cityInput: string;
  onCityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

export function FirstCard({
  onSubmit,
  cityInput,
  onCityInputChange,
  loading,
}: FirstCardProps) {
  return (
    <>
      <div className="first-card-area page">
        <div className="first-card">
          <div className="first-card-field">
            <p className="label">Add a city</p>
            <CustomInput
              value={cityInput}
              onChange={onCityInputChange}
              placeholder="Enter city name"
            />
          </div>
        </div>
      </div>
    </>
  );
}
