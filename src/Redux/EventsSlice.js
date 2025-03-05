// src/Redux/EventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/getevent/1");
      const data = response.data;
      if (data.details && Array.isArray(data.details)) {
        return data.details;
      } else if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.events)) {
        return data.events;
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch events';
      });
  },
});

export default eventsSlice.reducer;
