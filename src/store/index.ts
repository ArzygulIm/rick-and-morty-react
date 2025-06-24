import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../features/charactersSlice';
import locationsReducer from '../features/locationsSlice'; 
import episodesReducer from "../features/episodesSlice"
import characterReducer from '../features/characterSlice';
import episodeReducer from '../features/episodeSlice';
import LocationReducer from '../features/locationSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    locations: locationsReducer,
    episodes: episodesReducer,
    character: characterReducer,
    episode: episodeReducer,
    location: LocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
