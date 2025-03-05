// src/Redux/AuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: localStorage.getItem('loginStatus') === 'true'
    ? {
        tenant_id: localStorage.getItem('tenant_id'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
      }
    : null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/tenantlogin',
        JSON.stringify({ email, password }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const details =
        response.data.details && response.data.details[0]
          ? response.data.details[0]
          : null;
      if (details && details.status && details.status.toLowerCase() === 'active') {
        localStorage.setItem('loginStatus', 'true');
        localStorage.setItem(
          'tenant_id',
          details.tenant_id ? details.tenant_id.toString() : ''
        );
        localStorage.setItem('name', details.name || '');
        localStorage.setItem('email', details.email || '');
        return details;
      } else {
        return rejectWithValue(
          details && details.mes ? details.mes : 'Invalid credentials'
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('loginStatus');
      localStorage.removeItem('tenant_id');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
