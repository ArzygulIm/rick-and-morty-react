import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Link } from "react-router-dom";
import styles from "./EpisodeList.module.css";

export default function EpisodeList() {
  const { episodes } = useAppSelector((state) => state.episodes);

  return (
    <div className="row">
      {episodes.map((episode) => (
        <div className="col-4" key={episode.id}>
          <div className={`${styles["episode-card"]}`}>
            <Link to={`/episode/${episode.id}`}>
              <h3>{episode.name}</h3>
              <p>
                <strong>Air Date:</strong> {episode.air_date}
              </p>
              <p>
                <strong>Episode:</strong> {episode.episode}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
