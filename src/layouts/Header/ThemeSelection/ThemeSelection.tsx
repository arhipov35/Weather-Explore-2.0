import { useState } from "react";
import { colorIcons } from "./color";
import "./ThemeSelection.scss";
import { useTheme } from "../../../contexts/ThemeContext";
function ThemeSelection() {
  const [color, setColor] = useState<string>(colorIcons[0].photo);
  const { themeHandler } = useTheme();
  function selectTheme(theme: string, photo: string) {
    setColor(photo);
    themeHandler(theme);
  }
  return (
    <>
      <div className="dropdown">
        <div
          className="dropdown-toggle dropdown-style"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src={color} alt="" />
        </div>
        <ul className="dropdown-menu">
          {colorIcons.map((color, index) => (
            <>
              <li key={index} onClick={() => selectTheme(color.description, color.photo)}>
                <div className="option-color">
                  <img src={color.photo} alt="" />
                  <p className="description">{color.description}</p>
                </div>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
export default ThemeSelection;
