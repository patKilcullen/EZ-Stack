import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const TOKEN = 'token';

/*
  THUNKS
*/
export const freelanceMe = createAsyncThunk('auth/freelancer/me', async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get('/auth/freelancer/me', {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return 'There was an issue with your request.';
    }
  }
});

export const freelanceAuthenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ username, password, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/freelancer/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me());
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return 'There was an issue with your request.';
      }
    }
  }
);

/*
  SLICE
*/
export const freelancerAuthSlice = createSlice({
  name: 'freelancer',
  initialState: {
    me: {},
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(freelanceMe.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(freelanceMe.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(freelanceAuthenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

/*
  ACTIONS
*/
export const { logout } = freelancerAuthSlice.actions;

/*
  REDUCER
*/
export default freelancerAuthSlice.reducer;
