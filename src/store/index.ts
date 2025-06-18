import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../features/characters/charactersSlice';
import locationsReducer from '../features/locations/locationsSlice'; 
import episodesReducer from "../features/episodes/episodesSlice"

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    locations: locationsReducer,
    episodes: episodesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
