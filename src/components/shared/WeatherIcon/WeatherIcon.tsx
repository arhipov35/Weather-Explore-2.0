import { weatherIcons } from "./weather";
import defaultPhoto from "../../../assets/img/imgwepb/clouds.webp";
interface WeatherIcon {
  description: string;
  width?: number | string;
  height?: number;
}

export function WeatherIcon({
  description = "Default",
  width,
  height,
}: WeatherIcon) {
  const matchedIcon = weatherIcons.find(
    (icon) => icon.description === description
  );
  return (
    <>
      <img
        style={{ width: `${width}`, height: `${height}rem` }}
        src={matchedIcon ? matchedIcon.photo : defaultPhoto}
        alt={description}
      />
    </>
  );
}
