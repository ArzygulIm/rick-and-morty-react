import { Character } from "../../types/character";
import { Link } from "react-router-dom";
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

const CharacterCard = ({ character }: Props) => (
  <Link to={`/character/${character.id}`}>
    <div className={styles["character-card"]}>
      <img
        src={character.image}
        alt={character.name}
        className={styles["main-img"]}
      />

      <div className={styles["card-text"]}>
        <h5>{character.name}</h5>
        <div className="flex flex-jcsb">
          <div className="flex flex-fdc flex-aic">
            <span>Status</span>
            {character.status === "Alive" || "Dead" || "unknown" ? (
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
            ) : (
              <span>{character.status}</span>
            )}
          </div>

          <div className="flex flex-fdc flex-aic">
            <span>Species</span>
            {character.species === "Human" || "Alien" ? (
              <img
                src={character.species === "Human" ? HumanIcon : AlienIcon}
                alt="Species"
                className={styles["icons"]}
              />
            ) : (
              <span>{character.species}</span>
            )}
          </div>

          <div className="flex flex-fdc flex-aic">
            <span>Gender</span>
            {character.gender === "Male" || "Female" ? (
              <img
                src={character.gender === "Male" ? MaleIcon : FemaleIcon}
                alt="Gender"
                className={styles["icons"]}
              />
            ) : (
              <span>{character.gender}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default CharacterCard;
