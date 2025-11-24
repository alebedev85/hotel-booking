// store/searchSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  city_name: string;
  city_id: number | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  lat: number | null;
  lon: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  city_name: "",
  city_id: null,
  checkIn: "",
  checkOut: "",
  guests: 1,
  lat: null,
  lon: null,
  loading: false,
  error: null,
};

// Асинхронный экшен для получения координат города
export const fetchCoordinates = createAsyncThunk(
  "search/fetchCoordinates",
  async (city_name: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          city_name
        )}&format=json&limit=1`,
        {
          headers: { "User-Agent": "HotelApp/1.0" },
        }
      );

      const data = await res.json();

      if (!data.length) {
        return rejectWithValue("Город не найден");
      }

      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    } catch (e) {
      return rejectWithValue("Ошибка запроса координат");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setField(
      state,
      action: PayloadAction<{
        field: keyof SearchState;
        value: string | number;
      }>
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state[action.payload.field] as any) = action.payload.value;
    },

    resetSearch() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCoordinates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoordinates.fulfilled, (state, action) => {
        state.loading = false;
        state.lat = action.payload.lat;
        state.lon = action.payload.lon;
      })
      .addCase(fetchCoordinates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.lat = null;
        state.lon = null;
      });
  },
});

export const { setField, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
