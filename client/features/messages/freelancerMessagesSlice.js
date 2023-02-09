import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFreelancerMessagesAsync = createAsyncThunk('freelancerMessages', async (id) => {
  try{
    const { data } = await axios.get(`/api/messages/freelancer/${id}`)
    return data
  }catch(err){
    console.log(err)
  }
})


export const freelancerMessagesSlice = createSlice({
  name: 'freelancerMessages',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFreelancerMessagesAsync.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectFreelancerMessages = (state) => state.freelancerMessages

export default freelancerMessagesSlice.reducer
