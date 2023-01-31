import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchProjectsAsync = createAsyncThunk("allProjects", async () => {
      const { data } = await axios.get(`/api/projects`);
      return data;
    });

    export const fetchProjectsByCategoryAsync = createAsyncThunk("allProjectsByCategory", async (category) => {
      const { data } = await axios.get(`/api/projects/cat/${category}`);
      return data;
    });

    export const fetchProjectsByClientAsync = createAsyncThunk("allProjectsByClient", async (id) => {
        const { data } = await axios.get(`/api/projects/client/${id}`);
        return data;
      });

      export const fetchProjectsByFreelancerAsync = createAsyncThunk("allProjectsByFreelancer", async (id) => {
        const { data } = await axios.get(`/api/projects/freelancer/${id}`);
        return data;
      });

    export const addProjectAsync = createAsyncThunk("addProject", async ({clientId, description, category }) => {
      const { data } = await axios.post(`/api/projects`, {clientId, description, category});
        return data;
      });

    export const deleteSingleProjectAsync = createAsyncThunk("deleteSingleProject", async (id) => {
        await axios.delete(`/api/projects/${id}`);
      return id;
    })

  const projectsSlice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        return action.payload;
        
      });
      builder.addCase(fetchProjectsByCategoryAsync.fulfilled, (state, action) => {
        return action.payload;
        
      });
      builder.addCase(fetchProjectsByClientAsync.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(fetchProjectsByFreelancerAsync.fulfilled, (state, action) => {
        return action.payload;
      });

      builder.addCase(addProjectAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      });
      builder.addCase(deleteSingleProjectAsync.fulfilled, (state, action) => {
        state = state.filter(project =>{
          return project.id !== action.payload
        });
      });


    },
  });

  export const selectProjects = (state) => {

    return state.allProjects
}

  export default projectsSlice.reducer