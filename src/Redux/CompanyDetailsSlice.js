// src/Redux/CompanyDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../Views/HomeScreen/axiosInstance"; // Adjust path if needed

export const fetchCompanyDetails = createAsyncThunk(
  'company/fetchCompanyDetails',
  async (companyParam, { rejectWithValue }) => {
    try {
      // Use relative URL so that the proxy forwards the request.
      const response = await axiosInstance.get(`/api/directorycompany/${companyParam}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching company details');
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyDetails: null, 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companyDetails = {
          details: action.payload.companydetails?.[0] || null,
          pages: action.payload.companypages || [],
        };
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
