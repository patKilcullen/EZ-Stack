import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLikedProjectsAsync = createAsyncThunk('likedProjects', async (id) => {
  try{
    const { data } = await axios.get(`/api/likes/${id}`)
    return data
  }catch(err){
    console.log(err)
  }
})


export const likeProjectAsync = createAsyncThunk('likeProject', async ({freelancerId, projectId}) => {
  try{
    const { data } = await axios.post('/api/likes', {
      freelancerId,
      projectId
    })
    return data
  }catch(err){
    console.log(err)
  }
})

export const unlikeProjectAsync = createAsyncThunk('unlikeProject', async (id) => {
  try{
    const { data } = await axios.delete(`/api/likes/${id}`)
    return data
  }catch(err){
    console.log(err)
  }
})

const likedProjectsSlice = createSlice({
  name: 'likedProjects',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLikedProjectsAsync.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectLikedProjects = (state) => state.likedProjects

export default likedProjectsSlice.reducer
