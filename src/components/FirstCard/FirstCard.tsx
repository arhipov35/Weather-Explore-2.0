import React from "react";
import "./FirstCard.scss";
import { CustomInput } from "../shared/CustomInput/CustomInput";

interface FirstCardProps {
  onSubmit: (e: React.FormEvent) => void;
  cityInput: string;
  onCityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string;
}

export function FirstCard({
  onSubmit,
  cityInput,
  onCityInputChange,
  error,
}: FirstCardProps) {
  return (
    <>
      <div className="first-card-area page">
        <div className="first-card">
          <form onSubmit={onSubmit}>
            <CustomInput
              value={cityInput}
              onChange={onCityInputChange}
              placeholder="Kyiv"
              error={!!error}
              errorMessage={error}
            />
          </form>
        </div>
      </div>
    </>
  );
}
