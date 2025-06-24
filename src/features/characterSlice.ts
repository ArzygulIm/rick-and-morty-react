import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCharacterById, getCharacterByUrl } from "../api/api";
import { Character } from "../types/character";

interface CharacterState {
  character: Character | null;
  loading: boolean;
  error: string | null;
}

const initialState: CharacterState = {
  character: null,
  loading: false,
  error: null,
};

export const fetchCharacterById = createAsyncThunk<
  { character: Character },
  number | string
>(
  "characters/fetchCharacterById",
  async (id) => {
    if (typeof id === "string" && id.startsWith("http")) {
      const response = await getCharacterByUrl(id);
      return { character: response.data };
    }

    const response = await getCharacterById(Number(id));
    return { character: response.data };
  }
);

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.loading = false;
        state.character = action.payload.character;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading character";
      });
  },
});

export default characterSlice.reducer;