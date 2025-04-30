import "./Header.scss";
import { Link } from "react-router-dom";
import MusicSystem from "./MusicSystem/MusicSystem";
import { AuthSection } from "./AuthSection/AuthSection";
import { useRefetch } from "../../contexts/RefetchContext";
import ThemeSelection from "./ThemeSelection/ThemeSelection";

function Header() {
  const { toggle } = useRefetch();
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-section">
            <div className="navbar-theme">
              <ThemeSelection />
            </div>
          </div>
          <Link onClick={toggle} className="navbar-brand" to="/">
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
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
