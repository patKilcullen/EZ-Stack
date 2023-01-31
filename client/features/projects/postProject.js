import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProjectAsync } from "./allProjectsSlice";



// MATERIAL UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
////////////////

const AddProject = () => {
  
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const clientId = useSelector((state) => state.clientAuth.clientMe.id)

  const navigate = useNavigate()


  const dispatch = useDispatch();
  
  const handleAddProject = (e) => {
    e.preventDefault();
    dispatch(addProjectAsync({ clientId, description, category }))
    .then(()=> navigate("/projects/client/:clientId"))
  };

  const onChange = (e) => {
    const value = e.target.value;
    const nameInput = e.target.name;
    if (nameInput === "description") setDescription(value);
    if (nameInput === "category") setCategory(value);
  };
  
  return (
<Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <AddCircleOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Add Project
        </Typography>
        <Box
          component="form"
          onSubmit={handleAddProject}
          noValidate
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            label="description"
            autoComplete="description"
            value={description}
            name="description"
            onChange={onChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            autoComplete="category"
            label="category"
            value={category}
            name="category"
            onChange={onChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
            color="primary"
          >
            Add Project
          </Button>
        </Box>
      </Box>
    </Container>

    // <div id="addProject">
    //   <form onSubmit={handleAddProject}>
    //     <label htmlFor="description">Description:</label>
    //     <input
    //       name="description"
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //     />
    //     <label htmlFor="category">Category:</label>
    //     <input
    //       name="category"
    //       value={category}
    //       onChange={(e) => setCategory(e.target.value)}
    //     />
    //     <button type="submit">Post Project</button>
    //   </form>
    // </div>
  );
};

export default AddProject;