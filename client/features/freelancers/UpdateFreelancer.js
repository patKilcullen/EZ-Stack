import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSingleFreelancer, selectSingleFreelancer, updateFreelancerAsync } from "./singleFreelancerSlice";
// import { updateFreelancerAsync } from "./singleFreelancerSlice";

// MATERIAL UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
////////////////

const UpdateFreelancer = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.freelancerAuth.me.id)
  const freelancer = useSelector(selectSingleFreelancer)
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState('')
  const [categories, setCategories] = useState('')
  const [imageUrl, setImageUrl] = useState('')


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(updateFreelancerAsync({id: freelancer.id, firstName, lastName, email, description, username, categories, imageUrl }))
    .then(() => dispatch(fetchSingleFreelancer(id)));
    navigate('/profile')
  }

  useEffect(() => {
    const getFreelancer = async () => {
      await dispatch(fetchSingleFreelancer(id))
    }
    getFreelancer()
    setFirstName(freelancer.firstName)
    setLastName(freelancer.lastName)
    setEmail(freelancer.email)
    setDescription(freelancer.description)
    setUsername(freelancer.username)
    setCategories(freelancer.categories)
    setImageUrl(freelancer.imageUrl)
  }, [])

  return (

<Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          UPDATE YOUR INFORMATION
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="username"
            autoComplete="description"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            autoComplete="firstName"
            label="firstName"
            value={firstName}
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            autoComplete="lastName"
            label="lastName"
            value={lastName}
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            autoComplete="email"
            label="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            autoComplete="description"
            label="description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            autoComplete="categories"
            label="categories"
            value={categories}
            name="categories"
            onChange={(e) => setCategories(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            autoComplete="image"
            label="imageUrl"
            value={imageUrl}
            name="image"
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
            color="primary"
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>



    // <form 
    // onSubmit={handleSubmit}
    // >
    //     <h1>Update your information</h1>

    //   <label>Username:</label>
    //   <input 
    //   name="username"
    //   value={username}
    //   onChange={(e) => setUsername(e.target.value)}
    //   />

    //   <label >Name:</label>
    //   <input
    //     name="name"
    //     value={firstName}
    //     onChange={(e) => setFirstName(e.target.value)}
    //   />

    //   <label>Last name:</label>
    //   <input
    //     name="lastname"
    //     value={lastName}
    //     onChange={(e) => setLastName(e.target.value)}
    //   />
     
     
    //   <label>Email:</label>
    //   <input
    //     name="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
      
      
    //   <label>Description:</label>
    //   <input
    //     name="description"
    //     value={description}
    //     onChange={(e) => setDescription(e.target.value)}
    //   />

    //   <label>Categories:</label>
    //   <input 
    //   name='categories'
    //   value={categories}
    //   onChange={(e) => setCategories(e.target.value)}
    //   />

    //   <label>Profile Image:</label>
    //   <input 
    //   name="image"
    //   value={imageUrl}
    //   onChange={(e) => setImageUrl(e.target.value)}
    //   />

    //   <button type="submit">Edit</button>
    // </form>
  );
};

export default UpdateFreelancer;
