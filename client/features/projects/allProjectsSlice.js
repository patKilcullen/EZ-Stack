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

    export const addProjectAsync = createAsyncThunk("addProject", async ({clientId, title, description, category }) => {
      const { data } = await axios.post(`/api/projects`, {clientId, title, description, category});
        return data;
      });

    export const deleteSingleProjectAsync = createAsyncThunk("deleteSingleProject", async (id) => {
        await axios.delete(`/api/projects/${id}`);
      return id;
    })

  const projectsSlice = createSlice({
    name: "projects",
    initialState: {
      projects: [],
      projectsByCategory: [],
  },
    reducers: {
      sortByCategory(state, action){
        state.projectsByCategory = state.projects.filter((project) => project.category === action.payload)
      },
      sortByLiked(state, action){
        state.projectsByCategory = state.projects.filter((project) => action.payload.includes(project.id) )
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        state.projects = action.payload.filter((project) => project.status === "Pending");
        
      });
      builder.addCase(fetchProjectsByCategoryAsync.fulfilled, (state, action) => {
        state.projects = action.payload;
        
      });
      builder.addCase(fetchProjectsByClientAsync.fulfilled, (state, action) => {
        state.projects = action.payload;
      });
      builder.addCase(fetchProjectsByFreelancerAsync.fulfilled, (state, action) => {
        state.projects = action.payload;
      });

      builder.addCase(addProjectAsync.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
      builder.addCase(deleteSingleProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project =>{
          return project.id !== action.payload
        });
      });


    },
  });

  export const { sortByCategory, sortByLiked } = projectsSlice.actions;

  
  export const selectProjects = (state) => {

    return state.allProjects.projects
}
export const selectProjectsByCategory = (state) => {

  return state.allProjects.projectsByCategory
}

  export default projectsSlice.reducer
