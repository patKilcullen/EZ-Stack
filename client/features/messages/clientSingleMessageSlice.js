import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleClientMessageAsync = createAsyncThunk('clientSingleMessage', async ({id, clientId}) => {
  try{
    const { data } = await axios.get(`/api/messages/client/conversation/${id}?clientId=${clientId}`)
    return data
  }catch(err){
    console.log(err)
  }
})

export const sendClientMessageAsync = createAsyncThunk('clientSendMessage', async ({freelancerId, clientId, content, from}) => {
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

export const clientSingleMessageSlice = createSlice({
  name: 'clientSingleMessage',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleClientMessageAsync.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectSingleClientMessage = (state) => state.clientSingleMessage

export default clientSingleMessageSlice.reducer
