import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate()

  const freelancer = useSelector((state) => state.freelancerAuth.me.id)

  const client = useSelector((state) => state.clientAuth.clientMe.id)

  const { projectId, projectClientId, projectFreelancerId } = props

  const id = projectId
  

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchSingleProjectAsync(projectId)).then((res) => {
      const {status, title, description, category } = res.payload;

      setStatus(status);
      setTitle(title)
      setDescription(description);
      setCategory(category);
    });
  }, [dispatch]);

  ////CharacterLimit//////
  const CHARACTER_LIMIT = 30;

  const handleChange = title=> event => {
    setValues({ ...title, [title]: event.target.value });
  };
  //////////////
  const categories = ['Python Developer', 
'Javascript Developer',
'HTML & CSS Developer',
'Android Developer',
'iOS Developer'
]

  const handleEditProject = (e) => {
    e.preventDefault();
    dispatch(
      editSingleProject({ id, title, status, description, category })
    ).then(() => {
      dispatch(fetchSingleProjectAsync(projectId));
    }).then(()=>{
      navigate(`/projects/${id}`)
      window.location.reload()
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
            backgroundColor:"#F5F5F5",
            padding:"1em 1em",
            borderRadius: "4px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
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
        
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor:"#F5F5F5",
            padding:"1em 1em",
            borderRadius: "4px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AddCircleOutlinedIcon />
          </Avatar>
          <Typography color='primary' component="h1" variant="h4">
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
            autoComplete="title"
            label="title"
            value={title}
            name="title"
            inputProps={{
              maxLength: CHARACTER_LIMIT
            }}
            helperText={`${title.length}/${CHARACTER_LIMIT}`}
            onChange={(e) => setTitle(e.target.value) && handleChange(title)}
          /> 

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

           {/* category  */}
           <InputLabel >Category</InputLabel>
          <Select name='category'
          fullWidth
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value=""><em>select</em></MenuItem>
            {categories && categories.length
                        ? categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
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