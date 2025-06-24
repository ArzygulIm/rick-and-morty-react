import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllLocations } from "../api/api";
import { Location } from "../types/location";

interface LocationsState {
  locations: Location[];
  info: {
    count: number;
    pages: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationsState = {
  locations: [],
  info: null,
  loading: false,
  error: null,
};

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (page: number = 1) => {
    const response = await getAllLocations(page);
    return {
      locations: response.data.results,
      info: response.data.info,
      page,
    };
  }
);

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;

        if (action.payload.page === 1) {
          state.locations = action.payload.locations;
        } else {
          state.locations = [...state.locations, ...action.payload.locations];
        }
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading locations";
      });
  },
});

export default locationsSlice.reducer;