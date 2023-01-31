import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const CLIENTTOKEN = 'clienttoken';

/*
  THUNKS
*/
export const clientMe = createAsyncThunk('auth/client/me', async () => {
  const token = window.localStorage.getItem(CLIENTTOKEN);
  try {
    if (token) {
      const res = await axios.get('/auth/client/clientMe', {
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
  async ({ username, password, firstName, lastName, email, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/client/${method}`, { username, password, firstName, lastName, email });
      window.localStorage.setItem(CLIENTTOKEN, res.data.token);
      thunkAPI.dispatch(clientMe());
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
    clientMe: {},
    error: null,
  },
  reducers: {
    clientLogout(state, action) {
      console.log(state.clientMe)
      window.localStorage.removeItem(CLIENTTOKEN);
      state.clientMe = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clientMe.fulfilled, (state, action) => {
      state.clientMe = action.payload;
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
export const { clientLogout } = clientAuthSlice.actions;

/*
  REDUCER
*/
export default clientAuthSlice.reducer;
