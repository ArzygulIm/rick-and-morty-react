import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEpisodeById, getEpisodeByUrl } from "../api/api";
import { Episode } from "../types/episode";

interface EpisodeState {
  episode: Episode | null;
  loading: boolean;
  error: string | null;
}

const initialState: EpisodeState = {
  episode: null,
  loading: false,
  error: null,
};

export const fetchEpisodeById = createAsyncThunk<
  { episode: Episode },       
  number | string              
>(
  "episodes/fetchEpisodeById",
  async (id) => {
    if (typeof id === "string" && id.startsWith("http")) {
      const response = await getEpisodeByUrl(id);
      return { episode: response.data };
    }

    const response = await getEpisodeById(Number(id));
    return { episode: response.data };
  }
);

const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodeById.fulfilled, (state, action) => {
        state.loading = false;
        state.episode = action.payload.episode;
      })
      .addCase(fetchEpisodeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading episode";
      });
  },
});

export default episodeSlice.reducer;