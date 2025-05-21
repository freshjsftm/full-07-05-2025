import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAthleteById, fetchCreateAthlete } from '../api';
import { pendingCase, rejectedCase } from './functions';

export const fetchCreateAthleteAsync = createAsyncThunk(
  'athletes/fetchCreateAthleteAsync',
  async (formData, thunkAPI) => {
    try {
      const response = await fetchCreateAthlete(formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getAthleteByIdAsync = createAsyncThunk(
  'athletes/getAthleteByIdAsync',
  async (id, thunkAPI) => {
    try {
      const response = await getAthleteById(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const athletesSlice = createSlice({
  name: 'athletes',
  initialState: {
    athletes: [],
    selectedAthlete: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAthleteByIdAsync.pending, pendingCase);
    builder.addCase(getAthleteByIdAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.selectedAthlete = action.payload;
    });
    builder.addCase(getAthleteByIdAsync.rejected, rejectedCase);

    builder.addCase(fetchCreateAthleteAsync.pending, pendingCase);
    builder.addCase(fetchCreateAthleteAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.selectedAthlete = action.payload;
    });
    builder.addCase(fetchCreateAthleteAsync.rejected, rejectedCase);
  },
});

export default athletesSlice.reducer;
