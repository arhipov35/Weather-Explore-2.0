import "./Header.scss";
import { Link } from "react-router-dom";
import MusicSystem from "./MusicSystem/MusicSystem";
import { AuthSection } from "./AuthSection/AuthSection";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-section">
            <Link className="navbar-brand" to="/">
              Weather Explore 2.0
            </Link>
          </div>
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
