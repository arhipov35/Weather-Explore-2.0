import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { useRefetch } from "./RefetchContext";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./AuthContext";
import configuration from "../configuration";
import { WeatherData } from "../services/openWeather";

// Define types
export interface City {
  id: string;
  createdAt: string;
  weatherData?: WeatherData;
  index: number;
}

interface WeatherContextType {
  cities: City[];
  loading: boolean;
  error: string;
  isInitialView: boolean;
  isInitialLoading: boolean;
  addCity: (cityName: string, index: number) => Promise<string | void>;
  deleteCity: (cityId: string) => Promise<void>;
  updateCity: (cityId: string, newCityName: string) => Promise<string | void>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

// Create context
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Create provider component
export function WeatherProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { isToggled } = useRefetch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [isInitialView, setIsInitialView] = useState<boolean>(true);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  async function ApiWeather(name: string, api: string) {
    const request = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${api}&units=metric`)
    return request;
  }
  // Fetch cities and their weather data
  useEffect(() => {
    if (!user) return;

    const fetchCities = async () => {
      try {
        setIsInitialLoading(true);
        const citiesRef = collection(db, "cities");
        const q = query(citiesRef, where("uid", "==", user.uid));

        // Update weather data only on page load
        const updateWeatherData = async () => {
          const snapshot = await getDocs(q);
          for (const doc of snapshot.docs) {
            const data = doc.data();
            try {
              const weatherResponse = await ApiWeather(data.name, configuration.apiToken);
              if (weatherResponse.ok) {
                const weatherData: WeatherData = await weatherResponse.json();
                await updateDoc(doc.ref, { weatherData });
              }
            } catch (error) {
              console.error(`Error updating weather for ${data.name}:`, error);
            }
          }
        };

        // Update weather on page load
        await updateWeatherData();

        // Regular snapshot listener for changes without weather updates
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const citiesList: City[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            citiesList.push({
              id: doc.id,
              createdAt: data.createdAt,
              weatherData: data.weatherData,
              index: data.index,
            });
          });
          setCities(citiesList);
          const isNewInitialView = citiesList.length === 0;
          setIsInitialView(isNewInitialView);
          if (isNewInitialView) {
            setError(""); // Clear error when switching back to initial view
          }
          setIsInitialLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error in fetchCities:", error);
        setError("Failed to load your items");
        setIsInitialLoading(false);
      }
    };

    fetchCities();
  }, [user, isToggled]);

  // Add a city
  const addCity = async (cityName: string, index: number): Promise<string | void> => {
    if (!user) {
      return "You must be logged in to add items";
    }

    try {
      setLoading(true);

      const weatherResponse = await ApiWeather(cityName, configuration.apiToken);
      const weatherData: WeatherData = await weatherResponse.json();

      if (weatherResponse.status !== 200) {
        return "Failed to fetch weather data";
      }

      const apiCityName = weatherData.city.name;
      const existingCity = cities.find(
        (c) =>
          c.weatherData?.city?.name.toLowerCase() === apiCityName.toLowerCase()
      );

      if (existingCity) {
        return `City ${apiCityName} already added!`;
      }
      
      // Create new city
      const newCity = {
        uid: user.uid,
        name: apiCityName,
        createdAt: new Date().toISOString(),
        weatherData: weatherData,
        index: index,
      };

      await addDoc(collection(db, "cities"), newCity);
      setIsInitialView(false);
      
      // Успішне додавання, не повертаємо помилку
      return;
    } catch (err) {
      return err instanceof Error ? err.message : "Failed to add the city";
    } finally {
      setLoading(false);
    }
  };

  // Delete a city
  const deleteCity = async (cityId: string) => {
    if (!user) return;
    try {
      const cityRef = doc(db, "cities", cityId);
      await deleteDoc(cityRef);
    } catch (error) {
      console.error("Error deleting city:", error);
      setError("Failed to delete the city");
    }
  };

  // Update a city
  const updateCity = async (cityId: string, newCityName: string): Promise<string | void> => {
    if (!user) {
      return "You must be logged in to update items";
    }

    try {
      setLoading(true);

      // Fetch weather data for the new city
      const weatherResponse = await ApiWeather(newCityName, configuration.apiToken);

      if (weatherResponse.status !== 200) {
        return "Failed to fetch weather data";
      }

      const weatherData: WeatherData = await weatherResponse.json();
      const apiCityName = weatherData.city.name;

      // Check if the city already exists
      const existingCity = cities.find(
        (c) =>
          c.id !== cityId && // Skip the city we're updating
          c.weatherData?.city?.name.toLowerCase() === apiCityName.toLowerCase()
      );

      if (existingCity) {
        return `City ${apiCityName} already added!`;
      }

      // Update the city document in Firestore
      const cityRef = doc(db, "cities", cityId);
      await updateDoc(cityRef, {
        name: apiCityName,
        weatherData: weatherData
      });

      // Успішне оновлення, не повертаємо помилку
      return;
    } catch (err) {
      return err instanceof Error ? err.message : "Failed to update the city";
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    cities,
    loading,
    error,
    isInitialView,
    isInitialLoading,
    addCity,
    deleteCity,
    updateCity,
    setError,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

// Custom hook to use the weather context
export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
