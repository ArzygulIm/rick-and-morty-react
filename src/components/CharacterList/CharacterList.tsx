import NotFoundPage from "../../pages/NotfoundPage/NotfoundPage";
import { useAppSelector } from "../../store/hooks";
import CharacterCard from "../CharacterCard/CharacterCard";

interface CharacterListProps {
  lastElementRef?: (node: HTMLDivElement | null) => void;
}
export default function CharacterList({ lastElementRef }: CharacterListProps) {
  const { characters, loading, error } = useAppSelector((state) => state.characters);

  return (
    <div className="row">
      {loading && <p>Loading...</p>}
      {error && <NotFoundPage />}
      {characters.map((character, index) => {
        const isLast = index === characters.length - 1;
        return (
          <div
            className="col-6"
            key={character.id}
            ref={isLast && lastElementRef ? lastElementRef : null}
          >
            <CharacterCard character={character} />
          </div>
        );
      })}
    </div>
  );
}