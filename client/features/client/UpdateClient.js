import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchClient, selectClient, updateClientAsync } from "./clientSlice";

// MATERIAL UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
////////////

const UpdateClient = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.clientAuth.clientMe.id)
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const client = useSelector(selectClient)


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(updateClientAsync({id: client.id, firstName, lastName, email, description, username, imageUrl }))
    .then(() => dispatch(fetchClient(id)));  
    navigate('/profile')
  }

  useEffect(() => {
    const getClient = async () => {
      await dispatch(fetchClient(id))
    }
    getClient()
    setFirstName(client.firstName)
    setLastName(client.lastName)
    setEmail(client.email)
    setDescription(client.description)
    setUsername(client.username)
    setImageUrl(client.imageUrl)
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

    //   <label >First Name:</label>
    //   <input
    //     name="fisrtName"
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

export default UpdateClient;
