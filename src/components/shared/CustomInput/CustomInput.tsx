import React from "react";
import "./CustomInput.scss";

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
}

export function CustomInput({
  value,
  onChange,
  placeholder = "",
  className = "",
  type = "text",
}: CustomInputProps) {
  return (
    <div className="card-field">
      <p className="label">Add a city</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`custom-input ${className}`}
      />
      <p className="caption">Choose your location</p>
    </div>
  );
}
