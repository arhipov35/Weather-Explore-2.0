export type WeatherIcon = {
    description: string;
    photo: string;
};

export const weatherIcons: WeatherIcon[] = [
    { description: "Clear", photo: "/src/assets/img/imgwepb/sun.webp" },
    { description: "Clouds", photo: "/src/assets/img/imgwepb/clouds.webp" },
    { description: "Rain", photo: "/src/assets/img/imgwepb/rain.webp" },
    { description: "Mist", photo: "/src/assets/img/imgwepb/mist.webp" },
    { description: "Drizzle", photo: "/src/assets/img/imgwepb/drizzle.webp" },
    { description: "Haze", photo: "/src/assets/img/imgwepb/haze.webp" },
    { description: "Snow", photo: "/src/assets/img/imgwepb/snow.webp" },
    { description: "Smoke", photo: "/src/assets/img/imgwepb/smoke.webp" },
];
