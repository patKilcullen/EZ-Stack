import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//GET single client
export const fetchClient = createAsyncThunk(
    "singleClient",
    async (id) => {
      try {
        const { data } = await axios.get(`/api/clients/${id}`);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );


  //PUT update client information - client only



  const ClientSlice = createSlice({
    name: "client",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchClient.fulfilled, (state, action) => {
        console.log("payload from client", action.payload)
        return action.payload;
      });

    },
  });
  
  export const selectClient = (state) => state.client;
  
  export default ClientSlice.reducer;