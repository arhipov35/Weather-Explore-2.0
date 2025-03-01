import React from "react";
import "./CustomInput.scss";

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
  type?: string;
}

export function CustomInput({
  value,
  onChange,
  onSubmit,
  placeholder = "",
  className = "",
  type = "text",
}: CustomInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="card-field">
      <p className="label">Add a city</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className={`custom-input ${className}`}
      />
      <p className="caption">Choose your location</p>
    </div>
  );
}
