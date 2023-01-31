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



/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  // const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    console.log(formName)
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const option = evt.target.dispatchRoute.value;
    if(option === 'client'){
    dispatch(clientAuthenticate({ username, password, method: formName }));
    }else if(option === 'freelancer'){
    dispatch(freelancerAuthenticate({username, password, method: formName}))
    }
  }; 

  return (
    <div>
      <form className="signUpForm" onSubmit={handleSubmit} name={name}>
        <div className='signUpInput'>
          <TextField id="outlined-basic" label="username" name="username"  variant="filled" />
        </div>
        <div className='signUpInput'>
        <TextField id="outlined-basic" label="password" name="password"  variant="filled" />
        </div>
        <div>
        <InputLabel >User Type</InputLabel>
          <Select name='dispatchRoute'>
            <MenuItem value={'client'}>Client</MenuItem>
            <MenuItem value={'freelancer'}>Freelancer</MenuItem>
          </Select>
          <Button type="submit" variant='contained'>{displayName}</Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
