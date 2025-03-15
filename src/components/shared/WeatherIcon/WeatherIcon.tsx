import { weatherIcons } from "./weather";
import defaultPhoto from "../../../assets/img/cloud.svg";
interface WeatherIcon {
  description: string;
}

export function WeatherIcon({ description = "Default" }: WeatherIcon) {
  const matchedIcon = weatherIcons.find(
    (icon) => icon.description === description
  );
  return (
    <>
      <img
        src={matchedIcon ? matchedIcon.photo : defaultPhoto}
        alt={description}
      />
    </>
  );
}
