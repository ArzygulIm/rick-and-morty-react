import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCharacterById } from "../../features/characterSlice";
import styles from "./CharacterPage.module.css";

export default function CharacterPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { character, loading, error } = useAppSelector(
    (state) => state.character
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacterById(Number(id)));
    }
  }, [id, dispatch]);

  const getEpisodeNames = (episodeUrls: string[]) => {
    return episodeUrls.map((url) => {
      const episodeId = url.split("/").pop();
      return `Episode ${episodeId}`;
    });
  };

  console.log(character);
  return (
    <div>
      <Header minimal/>

      {character && (
        <div className="container">
          <div className={`${styles["character-details"]} flex`}>
            <img
              src={character.image}
              alt={character.name}
              className={`${styles["character-image"]}`}
            />
            <div className={`${styles["character-info"]} flex flex-fdc`}>
              <h2>Name: {character.name}</h2>
              {character.status ? (
                <p>
                  <strong>Status:</strong> {character.status}
                </p>
              ) : null}
              {character.species ? (
                <p>
                  <strong>Species:</strong> {character.species}
                </p>
              ) : null}

              {character.gender ? (
                <p>
                  <strong>Gender:</strong>
                  {character.gender}
                </p>
              ) : null}

              {character.type ? (
                <p>
                  <strong>Type:</strong> {character.type}
                </p>
              ) : null}

              {character.episode && character.episode.length > 0 && (
                <div>
                  <strong>Episodes:</strong>
                  <ul className={`${styles["episode-list"]} flex flex-wrap`}>
                    {getEpisodeNames(character.episode).map((name, index) => (
                      <li key={index}>
                        {" "}
                        <Link to={`/episode/${name.replace("Episode ", "")}`}>
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {character.location && character.location.name != "unknown" ? (
                <p>
                  <strong>Location:</strong> {character.location.name}
                  <Link
                    to={`/location/${character.location.url.split("/").pop()}`}
                    style={{ marginLeft: "5px" }}
                  >
                    More...
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
