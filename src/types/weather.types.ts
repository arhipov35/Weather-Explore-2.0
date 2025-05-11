export interface Main {
  temp: number;
  feels_like: number;
  humidity: number;
}

export interface Weather {
  main: string;
}

export interface Wind {
  speed: number;
}

export interface List {
  main: Main;
  wind: Wind;
  weather: Weather[];
  dt: number;
}

export interface City {
  id: number;
  name: string;
}

export interface WeatherData {
  list: List[];
  city: City;
}
