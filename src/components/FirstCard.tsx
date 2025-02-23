import React from 'react';

interface FirstCardProps {
  onSubmit: (e: React.FormEvent) => void;
  cityInput: string;
  onCityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

export const FirstCard: React.FC<FirstCardProps> = ({
  onSubmit,
  cityInput,
  onCityInputChange,
  loading
}) => {
  return (
    <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          value={cityInput}
          onChange={onCityInputChange}
          placeholder="Enter city name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          {loading ? "Adding..." : "Add City"}
        </button>
      </form>
    </div>
  );
};
