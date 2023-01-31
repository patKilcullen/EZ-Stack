import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProjectAsync, editSingleProject } from "./singleProjectSlice";




// MATERIAL UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
////////////////

const statuses = ["Pending", "Ongoing", "Complete"];

const EditProject = (props) => {
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const freelancer = useSelector((state) => state.freelancerAuth.me.id)

  const client = useSelector((state) => state.clientAuth.clientMe.id)

  const { projectId, projectClientId, projectFreelancerId } = props

  const id = projectId
  

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchSingleProjectAsync(projectId)).then((res) => {
      const {status, description, category } = res.payload;

      setStatus(status);
      setDescription(description);
      setCategory(category);
    });
  }, [dispatch]);

  const handleEditProject = (e) => {
    e.preventDefault();
    dispatch(
      editSingleProject({ id, status, description, category })
    ).then(() => {
      dispatch(fetchSingleProjectAsync(projectId));
    });
  };

  
  return (
    <div id="editProject">
    {/* Freelancers can only edit status? */}
    {freelancer === projectFreelancerId ? (
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
            Update Project Status
          </Typography>
          <Box
            component="form"
            onSubmit={handleEditProject}
            noValidate
            sx={{ mt: 3 }}
          >
            <InputLabel id="demo-simple-select-helper-label">
              Current Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              autoWidth
              label="status"
            >
              <MenuItem value="">
                <em>select</em>
              </MenuItem>
              {statuses && statuses.length
                ? statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))
                : null}
            </Select>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
              color="primary"
            >
              Update Status
            </Button>
          </Box>
        </Box>
      </Container>
    ) : null}

    {/* Clients can edit project */}
    {client === projectClientId ? (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
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
            Edit Project
          </Typography>
          <Box
            component="form"
            onSubmit={handleEditProject}
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
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="category"
              label="category"
              value={category}
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
              color="primary"
            >
              Edit Project
            </Button>
          </Box>
        </Box>
      </Container>
    ) : null}
  </div>



    // <div id="editProject">
    //   <form onSubmit={handleEditProject}>
    //     {freelancer === projectFreelancerId ? (
    //     <div id='dropDown'>
    //     <select
    //       name="status"
    //       value={status}
    //       onChange={(e) => setStatus(e.target.value)}
    //     >
    //     <option>Pending</option>
    //     <option>Ongoing</option>
    //     <option>Complete</option>
    //     </select>
    //     <Button  variant="contained" type="submit">Edit Status</Button>
    //     </div> ) : null }

    //     {client === projectClientId ? (
    //       <div>
    //         <div>
    //     <textarea
    //     className = 'descriptionInput'
    //       name="description"
    //       value={description}
    //       placeholder="Edit Description"
    //       onChange={(e) => setDescription(e.target.value)}
    //     />
    //     </div>
    //     <div>
    //     <input
    //       className="catInput"
    //       name="category"
    //       value={category}
    //       placeholder='edit category'
    //       onChange={(e) => setCategory(e.target.value)}
    //     />
    //     </div>
    //     <Button variant="contained" type="submit">Edit Project</Button>
    //     </div>
    //     ) : null} 
        
    //   </form>
    // </div>
  );
};

export default EditProject;