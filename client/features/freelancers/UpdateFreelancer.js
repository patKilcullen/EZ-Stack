import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSingleFreelancer, selectSingleFreelancer, updateFreelancerAsync } from "./singleFreelancerSlice";


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
    <form 
    onSubmit={handleSubmit}
    >
        <h1>Update your information</h1>

      <label>Username:</label>
      <input 
      name="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />

      <label >Name:</label>
      <input
        name="name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label>Last name:</label>
      <input
        name="lastname"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
     
     
      <label>Email:</label>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      
      <label>Description:</label>
      <input
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Categories:</label>
      <input 
      name='categories'
      value={categories}
      onChange={(e) => setCategories(e.target.value)}
      />

      <label>Profile Image:</label>
      <input 
      name="image"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      />

      <button type="submit">Edit</button>
    </form>
  );
};

export default UpdateFreelancer;
