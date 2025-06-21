import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage/Homepage';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import EpisodePage from './pages/EpisodePage/EpisodePage';
import LocationPage from './pages/LocationPage/LocationPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/episode/:id" element={<EpisodePage />} />
        <Route path="/location/:id" element={<LocationPage />} />
        {/* Add more routes as needed */}
      </Routes>
  );
}

export default App;