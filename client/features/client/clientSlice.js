import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//GET single client
export const fetchClient = createAsyncThunk("fetchClient", async (id) => {
  try {
    const { data } = await axios.get(`/api/clients/${id}`);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

// UPDATE client
export const updateClientAsync = createAsyncThunk(
  "updateClient",
  async ({
    id,
    firstName,
    lastName,
    email,
    description,
    username,
    imageUrl,
  }) => {
    try {
      const { data } = await axios.put(`/api/clients/${id}`, {
        firstName,
        lastName,
        email,
        description,
        username,
        imageUrl,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// CREATE client
const ClientSlice = createSlice({
  name: "client",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

/*
  ACTIONS
*/
export const selectClient = (state) => state.client;

/*
  REDUCER
*/
export default ClientSlice.reducer;
