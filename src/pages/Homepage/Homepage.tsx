import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCharacters } from '../../features/characters/charactersSlice';
import { fetchLocations } from '../../features/locations/locationsSlice';
import { fetchEpisodes } from '../../features/episodes/episodesSlice';
import { Pagination } from '../../components/Pagination/Pagination';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'characters' | 'locations' | 'episodes'>('characters');

  // Страницы по табам
  const [characterPage, setCharacterPage] = useState(1);
  const [locationPage, setLocationPage] = useState(1);
  const [episodePage, setEpisodePage] = useState(1);

  const { characters, info: charactersInfo } = useAppSelector((state) => state.characters);
  const { locations, info: locationsInfo } = useAppSelector((state) => state.locations);
  const { episodes, info: episodesInfo } = useAppSelector((state) => state.episodes);

  // Загрузка при переключении табов
  useEffect(() => {
    if (activeTab === 'characters') dispatch(fetchCharacters(characterPage));
    if (activeTab === 'locations') dispatch(fetchLocations(locationPage));
    if (activeTab === 'episodes') dispatch(fetchEpisodes(episodePage));
  }, [activeTab, characterPage, locationPage, episodePage, dispatch]);

  const handleClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
  };

  // Отдельный хендлер для каждой пагинации
  const handlePageChange = (newPage: number) => {
    if (activeTab === 'characters') setCharacterPage(newPage);
    if (activeTab === 'locations') setLocationPage(newPage);
    if (activeTab === 'episodes') setEpisodePage(newPage);
  };

  const getTotalPages = () => {
    if (activeTab === 'characters') return charactersInfo?.pages || 1;
    if (activeTab === 'locations') return locationsInfo?.pages || 1;
    if (activeTab === 'episodes') return episodesInfo?.pages || 1;
    return 1;
  };

  const getCurrentPage = () => {
    if (activeTab === 'characters') return characterPage;
    if (activeTab === 'locations') return locationPage;
    if (activeTab === 'episodes') return episodePage;
    return 1;
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button onClick={() => handleClick('characters')}>Characters</button>
        <button onClick={() => handleClick('locations')}>Locations</button>
        <button onClick={() => handleClick('episodes')}>Episodes</button>
      </div>

      <div>
        {activeTab === 'characters' &&
          characters?.map((char: any) => <div key={char.id}>{char.name}</div>)}

        {activeTab === 'locations' &&
          locations?.map((loc: any) => <div key={loc.id}>{loc.name}</div>)}

        {activeTab === 'episodes' &&
          episodes?.map((ep: any) => <div key={ep.id}>{ep.name}</div>)}
      </div>

      <Pagination
        currentPage={getCurrentPage()}
        totalPages={getTotalPages()}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;