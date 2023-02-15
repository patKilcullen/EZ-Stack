import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
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

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.clientAuth);
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    console.log(formName)
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const option = evt.target.dispatchRoute.value;
    if(option === 'client'){
    await dispatch(clientAuthenticate({ username, password, method: formName })).then(() => setErr(true))
    }else if(option === 'freelancer'){
    await dispatch(freelancerAuthenticate({username, password, method: formName})).then(() => setErr(true))
    }
    if(err && !errMessage){
      navigate('/')
    }else{
      setErrMessage('Incorrect username/password')
    }
    // navigate('/projects/client/client:id')
  }; 

  return (
    <div className='loginPage'>
    {errMessage ? <h3>{errMessage}</h3>: null}
    <Box
    sx={{
      marginTop: 4,
      margingBottom: 3,
      maxHeight: 345,
      maxWidth: 400,
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
    <Typography color='primary' component="h1" variant="h5">
      Sign in
    </Typography>
      <form className="signUpForm" onSubmit={handleSubmit} name={name}>
        <div className='signUpInput'>
          <TextField  id="outlined-basic" label="username" name="username"  variant="filled" />
        </div>
        <div className='signUpInput'>
        <TextField id="outlined-basic" label="password" name="password"  variant="filled" type={'password'} />
        </div>  
        <InputLabel align="center">Select User Type</InputLabel>
        <div
        style={{display:"flex", justifyContent:"space-evenly"}}
        >
          <Select defaultValue={'client'} name='dispatchRoute'>
            <MenuItem value={'client'}>Client</MenuItem>
            <MenuItem value={'freelancer'}>Freelancer</MenuItem>
          </Select>
          <Button type="submit" variant='contained'>{displayName}</Button>
        </div>
      </form>
      </Box>
      </div>
  );
};

export default AuthForm;
