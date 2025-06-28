import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";
import Burger from "../Burger/Burger";

interface HeaderProps {
  activeTab?: "characters" | "locations" | "episodes";
  onTabChange?: (tab: "characters" | "locations" | "episodes") => void;
  minimal?: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, minimal }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBack = () => {
    const tab = searchParams.get("tab") || "characters";
    const page = searchParams.get("page") || "1";
    navigate(`/?tab=${tab}&page=${page}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  if (minimal) {
    return (
      <header className={styles.header}>
        <div className="container">
          <button onClick={handleBack} className="logo">
            ← Back to List
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className="flex flex-jcsb flex-aic">
          <Link to="/" className="logo">
            Rick and Morty
          </Link>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.show : ""}`}>
            <button
              onClick={() => onTabChange?.("characters")}
              className={activeTab === "characters" ? "active" : ""}
            >
              Characters
            </button>
            <button
              onClick={() => onTabChange?.("locations")}
              className={activeTab === "locations" ? "active" : ""}
            >
              Locations
            </button>
            <button
              onClick={() => onTabChange?.("episodes")}
              className={activeTab === "episodes" ? "active" : ""}
            >
              Episodes
            </button>
          </nav>

          {/* Бургер */}
          <Burger isOpen={isMenuOpen} onToggle={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;