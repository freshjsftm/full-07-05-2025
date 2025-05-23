import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAthleteById, fetchCreateAthlete, updateAthleteById } from '../api';
import { pendingCase, rejectedCase } from './functions';

export const updateAthleteByIdAsync = createAsyncThunk(
  'athletes/updateAthleteByIdAsync',
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await updateAthleteById({ id, formData });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

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

const fulfilledCase = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.selectedAthlete = action.payload;
};

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
    builder.addCase(getAthleteByIdAsync.fulfilled, fulfilledCase);
    builder.addCase(getAthleteByIdAsync.rejected, rejectedCase);

    builder.addCase(fetchCreateAthleteAsync.pending, pendingCase);
    builder.addCase(fetchCreateAthleteAsync.fulfilled, fulfilledCase);
    builder.addCase(fetchCreateAthleteAsync.rejected, rejectedCase);

    builder.addCase(updateAthleteByIdAsync.pending, pendingCase);
    builder.addCase(updateAthleteByIdAsync.fulfilled, fulfilledCase);
    builder.addCase(updateAthleteByIdAsync.rejected, rejectedCase);
  },
});

export default athletesSlice.reducer;
