import { useState, useEffect } from "react";
import { colorIcons } from "./color";
import "./ThemeSelection.scss";
import { useTheme } from "../../../contexts/ThemeContext";
function ThemeSelection() {
  const { theme, themeHandler } = useTheme();
  const [color, setColor] = useState<string>(theme?.photo || colorIcons[0].photo);

  useEffect(() => {
    if (theme?.photo) {
      setColor(theme.photo);
    }
  }, [theme]);
  function selectTheme(theme: string, photo: string) {
    setColor(photo);
    themeHandler(theme);
  }
  return (
    <>
      <div className="dropdown" data-tour="theme-selection">
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
