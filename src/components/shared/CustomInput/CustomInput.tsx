import React from "react";
import "./CustomInput.scss";

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  error?: boolean;
  errorMessage?: string;
}

export function CustomInput({
  value,
  onChange,
  placeholder = "",
  className = "",
  type = "text",
  error = false,
  errorMessage = "No city found",
}: CustomInputProps) {
  return (
    <div className="card-field">
      <p className="label">Add a city</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`custom-input ${className} ${error ? "error-border" : ""}`}
      />
      <p className={`caption ${error ? "error" : ""}`}>
        {error ? errorMessage : "Choose your location"}
      </p>
    </div>
  );
}
