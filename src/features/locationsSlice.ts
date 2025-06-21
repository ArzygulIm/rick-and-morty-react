import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLocations } from "../api/api";
import { Location } from "../types/location";

interface LocationsState {
  locations: Location[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
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

export const fetchLocations = createAsyncThunk<any, number | undefined>(
  "locations/fetchLocations",
  async (page = 1) => {
    const response = await getAllLocations(page);
    return {
      locations: response.data.results,
      info: response.data.info,
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
        state.locations = action.payload.locations;
        state.info = action.payload.info;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading locations";
      });
  },
});

export default locationsSlice.reducer;
