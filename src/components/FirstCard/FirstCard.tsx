import React from "react";
import "./FirstCard.scss";
import { CustomInput } from "../shared/CustomInput/CustomInput";

interface FirstCardProps {
  onSubmit: (e: React.FormEvent) => void;
  cityInput: string;
  onCityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string;
  onCitySelect?: (city: string) => Promise<void>;
}

export function FirstCard({
  onSubmit,
  cityInput,
  onCityInputChange,
  error,
  onCitySelect,
}: FirstCardProps) {
  return (
    <>
      <div className="first-card-area page">
        <div className="first-card" data-tour="first-card">
          <form onSubmit={onSubmit}>
            <CustomInput
              value={cityInput}
              onChange={onCityInputChange}
              placeholder="Kyiv"
              error={!!error}
              errorMessage={error}
              onCitySelect={onCitySelect}
            />
          </form>
        </div>
      </div>
    </>
  );
}
