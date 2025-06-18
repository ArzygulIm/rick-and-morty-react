import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllEpisodes } from '../../api/api';
import { Episode } from '../../types/episode';

interface EpisodesState {
  episodes: Episode[];
  info: {
    count: number;
    pages: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: EpisodesState = {
  episodes: [],
  info: null,
  loading: false,
  error: null,
};

export const fetchEpisodes = createAsyncThunk<any, number | undefined>(
  'episodes/fetchEpisodes',
  async (page = 1) => {
    const response = await getAllEpisodes(page);
    return {
      episodes: response.data.results,
      info: response.data.info,
    };
  }
);

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes = action.payload.episodes;
        state.info = action.payload.info;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading episodes';
      });
  },
});

export default episodesSlice.reducer;