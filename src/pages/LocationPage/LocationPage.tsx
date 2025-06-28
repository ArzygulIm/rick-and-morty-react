import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchLocation } from "../../features/locationSlice";
import styles from "./LocationPage.module.css";
import { fetchCharacterById } from "../../features/characterSlice";
import { loadCharacterNames } from "../../features/charactersFromArray";

export default function LocationPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { location, loading, error } = useAppSelector(
    (state) => state.location
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchLocation(Number(id)));
    }
  }, [id, dispatch]);

  console.log(location);

  const [characterNames, setCharacterNames] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacterById(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const fetchNames = async () => {
      if (!location || !location.residents) return;
      if (location.residents.length > 100) {
        const array = await loadCharacterNames(location.residents.slice(0, 100));
        if (array) {
          setCharacterNames(array);
        }
      } else {
        const array = await loadCharacterNames(location.residents);
        if (array) {
          setCharacterNames(array);
        }
      }
    };

    fetchNames();
  }, [location]);

  return (
    <div>
      <Header minimal/>
      <div className="container" style={{ paddingTop: "40px", marginTop:"8vh" }} >
        <div className={`${styles["location-details"]} flex flex-fdc`}>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {location && (
            <div className="flex flex-fdc">
              <h2>Location: {location.name}</h2>
              <div>
                <strong>Characters:</strong>
                <ul className="flex flex-wrap">
                  {location.residents?.map((characterUrl, index) => {
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
