import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
}

interface LoginResponse {
  id: number;
  username: string;
  token: string;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const API_URL = 'https://localhost:3001';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Server error');
      }

      return data as LoginResponse;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - Server not responding');
      }
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
