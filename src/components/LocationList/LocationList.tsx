import React, { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchLocations } from "../../features/locationsSlice";
import styles from "./LocationList.module.css";
import { Link } from "react-router-dom";

interface CharacterListProps {
  lastElementRef?: (node: HTMLDivElement | null) => void;
}

export default function LocationList({ lastElementRef }: CharacterListProps) {
  const dispatch = useAppDispatch();
  const { locations, info, loading } = useAppSelector(
    (state) => state.locations
  );
  const page = useRef(1);

  // Первичная загрузка
  useEffect(() => {
    dispatch(fetchLocations(page.current));
  }, [dispatch]);

  // Intersection Observer
  const observer = useRef<IntersectionObserver | null>(null);
  const lastLocationRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && info && page.current < info.pages) {
          page.current += 1;
          dispatch(fetchLocations(page.current));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, info, dispatch]
  );

  return (
    <div className="row">
      {locations.map((location, index) => {
        const isLast = index === locations.length - 1;

        return (
          <div
            key={location.id}
            className="col-4"
            ref={isLast ? lastLocationRef : null}
          >
            <Link to={`/location/${location.id}`} className={styles["location-link"]}>
              <div className={styles["location-card"]}>
                <h3>{location.name}</h3>
                <p>
                  <strong>Type:</strong> {location.type}
                </p>
                <p>
                  <strong>Dimension:</strong> {location.dimension}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
      {loading && <p>Loading more locations...</p>}
    </div>
  );
}