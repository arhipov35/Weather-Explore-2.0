export type WeatherIcon = {
    description: string;
    photo: string;
};

export const weatherIcons: WeatherIcon[] = [
    { description: "Clear", photo: "/src/assets/img/sun.svg" },
    { description: "Clouds", photo: "/src/assets/img/cloud.svg" },
    { description: "Rain", photo: "/src/assets/img/rain.svg" },
    { description: "Mist", photo: "/src/assets/img/mist.svg" },
    { description: "Drizzle", photo: "/src/assets/img/drizzle.svg" },
    { description: "Haze", photo: "/src/assets/img/haze.svg" },
    { description: "Snow", photo: "/src/assets/img/snow.svg" },
    { description: "Smoke", photo: "/src/assets/img/smoke.svg" },
];
