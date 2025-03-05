import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/getcategory/1", {
        params: { tenant_id: 2 },
      });
      const data = response.data;
      let categoriesArray = [];
      if (data.details && Array.isArray(data.details)) {
        categoriesArray = data.details;
      } else if (Array.isArray(data)) {
        categoriesArray = data;
      } else if (data && Array.isArray(data.categories)) {
        categoriesArray = data.categories;
      }
      return categoriesArray;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      });
  },
});

export default CategoriesSlice.reducer;
