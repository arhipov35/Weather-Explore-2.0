import "./Header.scss";
import { Link } from "react-router-dom";
import MusicSystem from "./MusicSystem/MusicSystem";
import { AuthSection } from "./AuthSection/AuthSection";
import { useRefetch } from "../../contexts/RefetchContext";
import ThemeSelection from "./ThemeSelection/ThemeSelection";
import { useTheme } from "../../contexts/ThemeContext";

function Header() {
  const { toggle } = useRefetch();
  const { theme } = useTheme();
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-section">
            <div className="navbar-theme" data-tour="navbar-theme">
              <ThemeSelection />
            </div>
          </div>
          <Link onClick={toggle} className="navbar-brand" to="/" data-tour="logo-refresh">
            Weather Explore 2.0
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="burger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <MusicSystem />
              </li>
              <li className="nav-item">
                <AuthSection />
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="https://forms.gle/QwwQSBZSChvYcfqR8"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tour="feedback-icon"
                >
                  <img
                    className="feedback-icon"
                    src={theme?.sentIcon}
                    alt="Feedback"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
