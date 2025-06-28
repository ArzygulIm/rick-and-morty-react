import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useEffect, useRef, useCallback } from "react";
import { fetchEpisodes } from "../../features/episodesSlice";
import { Link } from "react-router-dom";
import styles from "./EpisodeList.module.css";
import NotFoundPage from "../../pages/NotfoundPage/NotfoundPage";

interface CharacterListProps {
  lastElementRef?: (node: HTMLDivElement | null) => void;
}

export default function EpisodeList({ lastElementRef }: CharacterListProps) {
  const dispatch = useAppDispatch();
  const { episodes, info, loading,error } = useAppSelector((state) => state.episodes);
  const page = useRef(1);

  useEffect(() => {
    dispatch(fetchEpisodes(page.current));
  }, [dispatch]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastEpisodeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          info &&
          page.current < info.pages
        ) {
          page.current += 1;
          dispatch(fetchEpisodes(page.current));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, info, dispatch]
  );

  return (
    <div className="row">
      {episodes.map((episode, index) => {
        const isLast = index === episodes.length - 1;
        return (
          <div
            className="col-4"
            key={episode.id}
            ref={isLast ? lastEpisodeRef : null}
          >
            <div className={styles["episode-card"]}>
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
        );
      })}

      {loading && <p>Loading more episodes...</p>}
      {error && <NotFoundPage />}
    </div>
  );
}