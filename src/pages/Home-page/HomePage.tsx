import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../contexts/AuthContext";
import { FirstCard } from "../../components/FirstCard/FirstCard";
import { MainCards } from "../../components/MainCards";
import configuration from "../../configuration";
import { WeatherData } from "../../services/openWeather";
import "./HomePage.scss";

interface City {
  id: string;
  createdAt: string;
  weatherData?: WeatherData;
  index: number;
}

export function HomePage() {
  const { user } = useAuth();
  const [cityInput, setCityInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [isInitialView, setIsInitialView] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Handle input change with debouncing
  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityInput(value);
  };

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
              const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${configuration.apiToken}&units=metric`
              );
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
          setIsInitialView(citiesList.length === 0);
          setIsInitialLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error in fetchCities:", error);
        setError("Failed to load your items");
      }
    };

    fetchCities();
  }, [user]);

  const handleSubmit = async (cityName: string, index: number) => {
    if (!user) {
      setError("You must be logged in to add items");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${configuration.apiToken}&units=metric`
      );
      const weatherData: WeatherData = await weatherResponse.json();

      if (weatherResponse.status !== 200) {
        throw new Error("Failed to fetch weather data");
      }

      const apiCityName = weatherData.city.name;
      const existingCity = cities.find(
        (c) =>
          c.weatherData?.city?.name.toLowerCase() === apiCityName.toLowerCase()
      );

      if (existingCity) {
        setError(`Місто ${apiCityName} вже існує в списку!`);
        return;
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add the city");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFirstCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(cityInput, 0);
    setCityInput("");
  };

  return (
    <section className="container-fluid page">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      
        {isInitialLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Loading your weather cards...</p>
          </div>
        ) : isInitialView ? (
          <FirstCard
            onSubmit={handleFirstCardSubmit}
            cityInput={cityInput}
            onCityInputChange={handleCityInputChange}
            loading={loading}
          />
        ) : (
          <MainCards
            cities={cities}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
      
    </section>
  );
}
