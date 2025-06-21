import { useAppSelector } from "../../store/hooks";
import CharacterCard from "../CharacterCard/CharacterCard";

export default function CharacterList() {
  const { characters } = useAppSelector((state) => state.characters);
  return (
    <div className="row">
      {characters.map((character) => (
        <div className="col-20" key={character.id}>
          <CharacterCard character={character} />
        </div>
      ))}
    </div>
  );
}
