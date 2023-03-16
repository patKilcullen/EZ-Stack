import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// GET all messages by client
export const fetchClientMessagesAsync = createAsyncThunk('clientMessages', async (id) => {
  try{
    const { data } = await axios.get(`/api/messages/client/${id}`)
    return data
  }catch(err){
    console.log(err)
  }
})


export const clientMessagesSlice = createSlice({
  name: 'clientMessages',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClientMessagesAsync.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

// ACTIONS
export const selectClientMessages = (state) => state.clientMessages
// REDUCER
export default clientMessagesSlice.reducer
