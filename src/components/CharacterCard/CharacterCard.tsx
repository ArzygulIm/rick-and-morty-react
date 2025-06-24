import { Character } from "../../types/character";
import { useLocation, Link } from "react-router-dom";
import styles from "./CharacterCard.module.css";
import AliveIcon from "../../icons/alive.png";
import DeadIcon from "../../icons/dead.png";
import UnknownIcon from "../../icons/unknown.png";
import HumanIcon from "../../icons/human.png";
import AlienIcon from "../../icons/alien.png";
import MaleIcon from "../../icons/male.png";
import FemaleIcon from "../../icons/female.png";

interface Props {
  character: Character;
}

const CharacterCard = ({ character }: Props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab") || "characters";
  const page = searchParams.get("page") || "1";

  const handleClick = () => {
  sessionStorage.setItem("scrollY", window.scrollY.toString());
};

  return (
    <Link to={`/character/${character.id}`} onClick={handleClick}>
      <div className={styles["character-card"]}>
        <img
          src={character.image}
          alt={character.name}
          className={styles["main-img"]}
        />

        <div className={`${styles["card-text"]} flex flex-jcsa flex-fdc`}>
          <h5>{character.name}</h5>
          <div className={`${styles["info-wrap"]} flex`}>
            <div className="flex flex-fdc flex-aic">
              <span>Status</span>
              <img
                src={
                  character.status === "Alive"
                    ? AliveIcon
                    : character.status === "Dead"
                    ? DeadIcon
                    : UnknownIcon
                }
                alt="Status"
                className={styles["icons"]}
              />
            </div>

            <div className="flex flex-fdc flex-aic">
              <span>Species</span>
              <img
                src={
                  character.species === "Human"
                    ? HumanIcon
                    : character.species === "Alien"
                    ? AlienIcon
                    : UnknownIcon
                }
                alt="Species"
                className={styles["icons"]}
              />
            </div>

            <div className="flex flex-fdc flex-aic">
              <span>Gender</span>
              <img
                src={
                  character.gender === "Male"
                    ? MaleIcon
                    : character.gender === "Female"
                    ? FemaleIcon
                    : UnknownIcon
                }
                alt="Gender"
                className={styles["icons"]}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;