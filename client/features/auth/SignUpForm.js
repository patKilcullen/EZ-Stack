import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { authenticate } from '../../app/store';
import { clientAuthenticate } from './clientAuthSlice';
import { freelancerAuthenticate } from './freelanceAuthSlice';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const SignUpForm = () => {
  // const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
  }; 

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <select name='dispatchRoute'>
            <option value={'client'}>Client</option>
            <option value={'freelancer'}>Freelancer</option>
          </select>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm
