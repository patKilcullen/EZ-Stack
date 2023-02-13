import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchSingleFreelancer,
  selectSingleFreelancer,
  updateFreelancerAsync,
} from "./singleFreelancerSlice";
import ImageUpload from "../imageUpload/ImageUpload";


// MATERIAL UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Menu } from "@mui/material";
////////////////

const categories = ['Python Developer', 
'Javascript Developer',
'HTML & CSS Developer',
'Android Developer',
'iOS Developer'
]

const specialtiesList =['Web Application, Scripting, Bug Fixes, Help/Consultation', 
'Custom Websites using WordPress, Shopify, Wix, etc.',
'Mobile Apps, Desktop Applications, Game Development',
'Website Development, Maitaince, and Customization',
]

const UpdateFreelancer = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.freelancerAuth.me.id);
  const freelancer = useSelector(selectSingleFreelancer);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [hourlyRate, setHourlyRate] = useState("")
  // const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");



  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(
      updateFreelancerAsync({
        id: freelancer.id,
        firstName,
        lastName,
        email,
        description,
        hourlyRate,
        username,
        category,
        specialties
      })
    ).then(() => dispatch(fetchSingleFreelancer(id)));
    navigate("/profile");
    window.location.reload()
  };

  useEffect(() => {
    const getFreelancer = async () => {
      await dispatch(fetchSingleFreelancer(id));
    };
    getFreelancer();
    setFirstName(freelancer.firstName);
    setLastName(freelancer.lastName);
    setEmail(freelancer.email);
    setDescription(freelancer.description);
    setUsername(freelancer.username);
    setHourlyRate(freelancer.hourlyRate);
    setCategory(freelancer.category);
    setSpecialties(freelancer.specialties);
  }, []);

  ////CharacterLimit//////
  const CHARACTER_LIMIT = 70;

  const handleChange = bio => event => {
    setValues({ ...bio, [bio]: event.target.value });
  };
  //////////////

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          padding: "1em 1em",
          borderRadius: "4px",
          display: 'flex', flexWrap: 'wrap',
          
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color='primary' component="h1" variant="h4">
          UPDATE YOUR INFORMATION
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3,
        }}>
         

          <TextField
            margin="normal"
            required
            sx={{ m: 1, width: '25ch' }}
            autoComplete="firstName"
            label="firstName"
            value={firstName}
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            sx={{ m: 1, width: '25ch' }}
            autoComplete="lastName"
            label="lastName"
            value={lastName}
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          /> 
          <TextField
            margin="normal"
            required
            sx={{ m: 1, width: '25ch' }}
            label="username"
            autoComplete="description"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />

<TextField
            margin="normal"
            required
            sx={{ m: 1, width: '25ch' }}
            type="number"
            autoComplete="hourlyRate"
            label="hourlyRate"
            value={hourlyRate}
            name="hourlyRate"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            onChange={(e) => setHourlyRate(e.target.value)}
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
          
          {/* specialties */}
          <InputLabel >Specialties</InputLabel>
          <Select 
          name='specialties'
          label="Specialties"
          value={specialties}
          fullWidth
          onChange={(e) => setSpecialties(e.target.value)}
          >
            <MenuItem value=""><em>select</em></MenuItem>
            {specialtiesList && specialtiesList.length
                        ? specialtiesList.map((specialties) => (
                            <MenuItem key={specialties} value={specialties}>
                              {specialties}
                            </MenuItem>
                          ))
                        : null}
          </Select>


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
        <ImageUpload />
      </Box>
    </Container>
  );
};

export default UpdateFreelancer;
