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
            />
          </form>
        </div>
      </div>
    </>
  );
}
