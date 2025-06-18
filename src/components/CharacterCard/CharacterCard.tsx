import { Character } from '../../types/character';
import { Link } from 'react-router-dom';

interface Props {
  character: Character;
}

const CharacterCard = ({ character }: Props) => (
  <Link to={`/character/${character.id}`} className="border p-4 rounded shadow hover:bg-gray-100">
   
  </Link>
);

export default CharacterCard;