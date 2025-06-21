import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocationById, getLocationByUrl } from "../api/api";
import { Location } from "../types/location";

interface LocationState {
  location: Location | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  location: null,
  loading: false,
  error: null,
};

export const fetchLocation = createAsyncThunk<
  { location: Location },
  number | string
>(
  "locations/fetchLocation", 
  async (id) => {
    if (typeof id === "string" && id.startsWith("http")) {
      const response = await getLocationByUrl(id);
      return { location: response.data };
    }

    const response = await getLocationById(Number(id));
    return { location: response.data };
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload.location;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading location"; // ✅ исправлено
      });
  },
});

export default locationSlice.reducer;