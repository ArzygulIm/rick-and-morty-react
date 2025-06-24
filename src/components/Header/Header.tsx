import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  activeTab?: "characters" | "locations" | "episodes";
  onTabChange?: (tab: "characters" | "locations" | "episodes") => void;
  minimal?: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, minimal }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleBack = () => {
    const tab = searchParams.get("tab") || "characters";
    const page = searchParams.get("page") || "1";
    navigate(`/?tab=${tab}&page=${page}`);
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
            MyAppLogo
          </Link>
          <nav>
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
        </div>
      </div>
    </header>
  );
};

export default Header;