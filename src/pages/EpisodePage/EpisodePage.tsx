import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchEpisodeById } from "../../features/episodeSlice";
import { getCharacterByUrl } from "../../api/api";
import styles from "./EpisodePage.module.css";
import { loadCharacterNames } from "../../features/charactersFromArray";
import NotFoundPage from "../NotfoundPage/NotfoundPage";

export default function EpisodePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { episode, loading, error } = useAppSelector((state) => state.episode);

  const [characterNames, setCharacterNames] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchEpisodeById(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const fetchNames = async () => {
      if (!episode || !episode.characters) return;
      const array = await loadCharacterNames(episode.characters);
      if (array) {
        setCharacterNames(array);
      }
    };

    fetchNames();
  }, [episode]);

  console.log(episode);

  return (
    <div>
      <Header minimal/>
      <div className="container" style={{ paddingTop: "40px", marginTop:"8vh" }} >
        <div className={`${styles["episode-details"]} flex flex-fdc`}>
          {loading && <p>Loading...</p>}
          {error && <NotFoundPage/>}
          {episode && (
            <div className="flex flex-fdc">
              <h2>Episode: {episode.name}</h2>
              <p>
                <strong>Air Date:</strong> {episode.air_date}
              </p>
              <p>
                <strong>Episode:</strong> {episode.episode}
              </p>
              <div>
                <strong>Characters:</strong>
                <ul className="flex flex-wrap">
                  {episode.characters.map((characterUrl, index) => {
                    const characterId = characterUrl.split("/").pop();
                    return (
                      <li key={characterId}>
                        <Link to={`/character/${characterId}`}>
                          {characterNames[index] || `Character ${characterId}`}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
