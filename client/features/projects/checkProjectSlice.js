import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkLikedProjectsAsync = createAsyncThunk('checkLiked', async ({freelancerId, projectId}) => {
  try{
    const { data } = await axios.get(`/api/likes/check/${freelancerId}?projectId=${projectId}`)
    return data
  }catch(err){
    console.log(err)
  }
})

const checkLikedProjectsSlice = createSlice({
  name: 'checkLikedProjects',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkLikedProjectsAsync.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectCheckProjects = (state) => state.checkLikedProjects

export default checkLikedProjectsSlice.reducer
