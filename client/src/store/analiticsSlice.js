import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAthletesBySport, fetchAthletesByCountry } from '../api';
import { pendingCase, rejectedCase } from './functions';

export const fetchAthletesByCountryAsync = createAsyncThunk(
  'analitics/fetchAthletesByCountryAsync',
  async (_, thunkAPI) => {
    try {
      const response = await fetchAthletesByCountry();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchAthletesBySportAsync = createAsyncThunk(
  'analitics/fetchAthletesBySportAsync',
  async (_, thunkAPI) => {
    try {
      const response = await fetchAthletesBySport();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const analiticsSlice = createSlice({
  name: 'analitics',
  initialState: {
    isLoading: false,
    error: null,
    athletesBySport: [],
    athletesByCountry: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAthletesBySportAsync.pending, pendingCase);
    builder.addCase(fetchAthletesBySportAsync.rejected, rejectedCase);
    builder.addCase(fetchAthletesBySportAsync.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.athletesBySport = action.payload;
    });
    builder.addCase(fetchAthletesByCountryAsync.pending, pendingCase);
    builder.addCase(fetchAthletesByCountryAsync.rejected, rejectedCase);
    builder.addCase(fetchAthletesByCountryAsync.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.athletesByCountry = action.payload;
    });
  },
});

export default analiticsSlice.reducer;
