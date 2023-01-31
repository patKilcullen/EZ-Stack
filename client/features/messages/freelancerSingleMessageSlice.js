import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleFreelancerMessageAsync = createAsyncThunk('freelancerSingleMessage', async ({id, freelancerId}) => {
  try{
    const { data } = await axios.get(`/api/messages/freelancer/conversation/${id}?freelancerId=${freelancerId}`)
    return data
  }catch(err){
    console.log(err)
  }
})

export const sendFreelancerMessageAsync = createAsyncThunk('freelancerSendMessage', async ({freelancerId, clientId, content, from}) => {
  try{
    const { data } = await axios.post(`/api/messages`, {
      freelancerId,
      clientId,
      content,
      from
    })
    return data
  }catch(err){
    console.log(err)
  }
})

export const updateMessageAsync = createAsyncThunk('updateMessage', async ({id, read}) => {
  try{
    const { data } = await axios.put(`/api/messages/client/${id}`, {
      read
    })
    return data
  }catch(err){
    console.log(err)
  }
})

export const freelancerSingleMessageSlice = createSlice({
  name: 'freelancerSingleMessage',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleFreelancerMessageAsync.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectSingleFreelancerMessage = (state) => state.freelancerSingleMessage

export default freelancerSingleMessageSlice.reducer
