import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Views/HomeScreen/axiosInstance"; 

export const fetchDirectoryData = createAsyncThunk(
  "directory/fetchDirectoryData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/directorydetails/ebn`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

const directorySlice = createSlice({
  name: "directory",
  initialState: {
    directoryDetails: [],
    directoryCategories: [],
    directoryCompanies: [],
    searchTerm: "",
    categorySearchTerm: "",
    heroSearchTerm: "",
    selectedCategories: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setCategorySearchTerm(state, action) {
      state.categorySearchTerm = action.payload;
    },
    setHeroSearchTerm(state, action) {
      state.heroSearchTerm = action.payload;
    },
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectoryData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDirectoryData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.directoryDetails = action.payload.companydetails || [];
        state.directoryCategories = action.payload.directorycategories || [];
        state.directoryCompanies = action.payload.directorycompanies || [];
      })
      .addCase(fetchDirectoryData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, setCategorySearchTerm, setHeroSearchTerm, setSelectedCategories } =
  directorySlice.actions;

export default directorySlice.reducer;
