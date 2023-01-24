import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const TOKEN = 'token';

/*
  THUNKS
*/
export const clientMe = createAsyncThunk('auth/client/me', async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get('/auth/client/me', {
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

export const clientAuthenticate = createAsyncThunk(
  'clientAuth/authenticate',
  async ({ username, password, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/client/${method}`, { username, password });
      console.log(res)
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
export const clientAuthSlice = createSlice({
  name: 'clientAuth',
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
    builder.addCase(clientMe.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(clientMe.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(clientAuthenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

/*
  ACTIONS
*/
export const { logout } = clientAuthSlice.actions;

/*
  REDUCER
*/
export default clientAuthSlice.reducer;
