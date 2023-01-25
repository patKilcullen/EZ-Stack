import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchProjectsAsync = createAsyncThunk("allProjects", async () => {
      const { data } = await axios.get(`/api/projects`);
      return data;
    });

    export const fetchProjectsByClientAsync = createAsyncThunk("allProjectsByClient", async (id) => {
        const { data } = await axios.get(`/api/projects/client/${id}`);
        return data;
      });

    export const addProjectAsync = createAsyncThunk("addProject", async ({}) => {
      const { data } = await axios.post(`/api/projects`, {});
        return data;
      });

    export const deleteSingleProjectAsync = createAsyncThunk("deleteSingleProject", async (id) => {
        await axios.delete(`/api/projects/${id}`);
      return id;
    })

  const projectsSlice = createSlice({
    name: "Projects",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        console.log("PAYLOAD: ", action.payload)
        return action.payload;
        
      });
      builder.addCase(fetchProjectsByClientAsync.fulfilled, (state, action) => {
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

  export const selectProjects = (state) => state.Projects

  export default projectsSlice.reducer