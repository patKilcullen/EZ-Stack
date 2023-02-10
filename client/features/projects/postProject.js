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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
////////////////


const categories = ['Python Developer', 
'Javascript Developer',
'HTML & CSS Developer',
'Android Developer',
'iOS Developer'
]



const AddProject = () => {
  
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState('')

  const clientId = useSelector((state) => state.clientAuth.clientMe.id)

  const navigate = useNavigate()


  const dispatch = useDispatch();
  
  const handleAddProject = (e) => {
    e.preventDefault();
    dispatch(addProjectAsync({ clientId, title, description, category }))
    .then(()=> navigate("/projects/client/:clientId"))
  };


  const onChange = (e) => {
    const value = e.target.value;
    const nameInput = e.target.name;
    if (nameInput === "description") setDescription(value);
    if (nameInput === "category") setCategory(value);
    // if (nameInput === "title") setTitle(value)
  };

   ////CharacterLimit//////
   const CHARACTER_LIMIT = 30;

   const handleChange = title=> event => {
     setValues({ ...title, [title]: event.target.value });
   };
   //////////////
  
  return (
<Container component="main" maxWidth="sm">
      <Box
        sx={{
        marginTop: 3,
        marginBottom: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor:"#F5F5F5",
        padding:"1em 1em",
        borderRadius: "4px"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <AddCircleOutlinedIcon />
        </Avatar>
        <Typography color='primary' component="h1" variant="h4">
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
            onChange={onChange}
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
            Add Project
          </Button>
        </Box>
      </Box>
    </Container>

  );
};

export default AddProject;
