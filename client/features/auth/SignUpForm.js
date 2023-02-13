import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { authenticate } from '../../app/store';
import { clientAuthenticate } from './clientAuthSlice';
import { freelancerAuthenticate } from './freelanceAuthSlice';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';




/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const SignUpForm = () => {
  // const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    console.log(formName)
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const firstName = evt.target.firstName.value
    const lastName = evt.target.lastName.value
    const email = evt.target.email.value
    const option = evt.target.dispatchRoute.value;
    if(option === 'client'){
    dispatch(clientAuthenticate({ username, password, firstName, lastName, email, method: 'signup' }));
    }else if(option === 'freelancer'){
    dispatch(freelancerAuthenticate({username, password, firstName, lastName, email, method: 'signup'}))
    }
    navigate('/profile')
  }; 

  return (
    <Box
    sx={{
      marginTop: 4,
      margingBottom: 4,
      maxHeight: 550,
      maxWidth: 550,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor:"#F5F5F5",
      borderRadius: "4px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",

    }}
  >
    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
      <form className="signUpForm" onSubmit={handleSubmit} name={name}>
        <div className="signUpInput">
          <TextField id="outlined-basic" label="username" name="username"  variant="filled" />
        </div>
        <div className="signUpInput">
          <TextField id="outlined-basic" label="password" name="password"  variant="filled" />
        </div>
        <div className="signUpInput">
          <TextField id="outlined-basic" label="firstName" name="firstName"  variant="filled" />
        </div>
        <div className="signUpInput">
          <TextField id="outlined-basic" label="lastName" name="lastName"  variant="filled" />
        </div>
        <div className="signUpInput">
        <TextField id="outlined-basic" label="email" name="email"  variant="filled" />
        </div>
       <InputLabel align="center" > Select User Type</InputLabel>
        <div 
        style={{display:"flex", justifyContent:"space-evenly"}}
        >
          <Select defaultValue={'client'} name='dispatchRoute'>
            <MenuItem value={'client'}>Client</MenuItem>
            <MenuItem value={'freelancer'}>Freelancer</MenuItem>
          </Select>
          <Button type="submit" variant="contained">Sign Up</Button>
        </div>
      </form>
      </Box>
  );
};

export default SignUpForm
