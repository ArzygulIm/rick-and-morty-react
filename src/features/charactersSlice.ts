import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCharacters } from "../api/api";
import { Character } from "../types/character";

interface CharactersState {
  characters: Character[];
  info: {
    count: number;
    pages: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  info: null,
  loading: false,
  error: null,
};

// Thunk: получает персонажей по номеру страницы
export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (page: number = 1) => {
    const response = await getAllCharacters(page);
    return {
      characters: response.data.results,
      info: response.data.info,
      page,
    };
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;

        if (action.payload.page === 1) {
          // первая страница — заменяем старые данные
          state.characters = action.payload.characters;
        } else {
          // остальные — добавляем
          state.characters = [...state.characters, ...action.payload.characters];
        }
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading characters";
      });
  },
});

export default charactersSlice.reducer;