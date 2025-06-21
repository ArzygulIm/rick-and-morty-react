import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCharacters } from "../../features/charactersSlice";
import { fetchLocations } from "../../features/locationsSlice";
import { fetchEpisodes } from "../../features/episodesSlice";
import { Pagination } from "../../components/Pagination/Pagination";
import CharacterList from "../../components/CharacterList/CharacterList";
import Header from "../../components/Header/Header";
import EpisodeList from "../../components/EpisodeList/EpisodeList";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<
    "characters" | "locations" | "episodes"
  >("characters");

  const [characterPage, setCharacterPage] = useState(1);
  const [locationPage, setLocationPage] = useState(1);
  const [episodePage, setEpisodePage] = useState(1);

  const { info: charactersInfo } = useAppSelector((state) => state.characters);
  const { info: locationsInfo } = useAppSelector((state) => state.locations);
  const { episodes, info: episodesInfo } = useAppSelector(
    (state) => state.episodes
  );

  useEffect(() => {
    if (activeTab === "characters") dispatch(fetchCharacters(characterPage));
    if (activeTab === "locations") dispatch(fetchLocations(locationPage));
    if (activeTab === "episodes") dispatch(fetchEpisodes(episodePage));
  }, [activeTab, characterPage, locationPage, episodePage, dispatch]);

  const handleClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (newPage: number) => {
    if (activeTab === "characters") setCharacterPage(newPage);
    if (activeTab === "locations") setLocationPage(newPage);
    if (activeTab === "episodes") setEpisodePage(newPage);
  };

  const getTotalPages = () => {
    if (activeTab === "characters") return charactersInfo?.pages || 1;
    if (activeTab === "locations") return locationsInfo?.pages || 1;
    if (activeTab === "episodes") return episodesInfo?.pages || 1;
    return 1;
  };

  const getCurrentPage = () => {
    if (activeTab === "characters") return characterPage;
    if (activeTab === "locations") return locationPage;
    if (activeTab === "episodes") return episodePage;
    return 1;
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="flex gap-4 mb-4">
          <button onClick={() => handleClick("characters")}>Characters</button>
          <button onClick={() => handleClick("locations")}>Locations</button>
          <button onClick={() => handleClick("episodes")}>Episodes</button>
        </div>

        <div>
          {activeTab === "characters" && <CharacterList />}
          {activeTab === "locations" && (
            <div>Локации</div>
          )}
          {activeTab === "episodes" && <EpisodeList />}
        </div>

        <Pagination
          currentPage={getCurrentPage()}
          totalPages={getTotalPages()}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default HomePage;
