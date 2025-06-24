import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCharacters } from "../../features/charactersSlice";
import { fetchLocations } from "../../features/locationsSlice";
import { fetchEpisodes } from "../../features/episodesSlice";
import CharacterList from "../../components/CharacterList/CharacterList";
import LocationList from "../../components/LocationList/LocationList";
import EpisodeList from "../../components/EpisodeList/EpisodeList";
import Header from "../../components/Header/Header";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTab =
    (searchParams.get("tab") as "characters" | "locations" | "episodes") ||
    "characters";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [activeTab, setActiveTab] = useState(initialTab);
  const pageRef = useRef(initialPage);

  const charactersInfo = useAppSelector((state) => state.characters.info);
  const locationsInfo = useAppSelector((state) => state.locations.info);
  const episodesInfo = useAppSelector((state) => state.episodes.info);

  useEffect(() => {
    const loadAllPages = async () => {
      for (let i = 1; i <= pageRef.current; i++) {
        if (activeTab === "characters") await dispatch(fetchCharacters(i));
        if (activeTab === "locations") await dispatch(fetchLocations(i));
        if (activeTab === "episodes") await dispatch(fetchEpisodes(i));
      }
    };
    loadAllPages();
  }, [dispatch, activeTab]);

  useEffect(() => {
    setSearchParams({ tab: activeTab, page: pageRef.current.toString() });
  }, [activeTab, setSearchParams]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      const info =
        activeTab === "characters"
          ? charactersInfo
          : activeTab === "locations"
          ? locationsInfo
          : episodesInfo;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && info && pageRef.current < info.pages) {
          pageRef.current += 1;
          setSearchParams({ tab: activeTab, page: pageRef.current.toString() });
          if (activeTab === "characters")
            dispatch(fetchCharacters(pageRef.current));
          if (activeTab === "locations")
            dispatch(fetchLocations(pageRef.current));
          if (activeTab === "episodes")
            dispatch(fetchEpisodes(pageRef.current));
        }
      });
      if (node) observer.current.observe(node);
    },
    [
      dispatch,
      activeTab,
      charactersInfo,
      locationsInfo,
      episodesInfo,
      setSearchParams,
    ]
  );

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  return (
    <>
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          pageRef.current = 1; // Сбрасываем страницу
          setActiveTab(tab);
        }}
      />

      <div style={{ paddingTop: "60px", marginTop:"8vh" }} className="container">
        {activeTab === "characters" && (
          <CharacterList lastElementRef={lastElementRef} />
        )}
        {activeTab === "locations" && (
          <LocationList lastElementRef={lastElementRef} />
        )}
        {activeTab === "episodes" && (
          <EpisodeList lastElementRef={lastElementRef} />
        )}
      </div>
    </>
  );
};

export default HomePage;
