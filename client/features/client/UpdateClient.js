import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const UpdateClient = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  // const [imageUrl, setImageUrl] = useState("");


  const handleSubmit = (evt) => {
    evt.preventDefault();
  //   const updatedSite = {id, name, imageUrl, amazonLink, siteId }
  // dispatch(updateSinglePlantAsync(updatedSite))
  // .then(() => { 
  //   dispatch(fetchPlantsAsync());
  //   dispatch(fetchSitesAsync());
  // });
  }

  return (
    <form 
    // style={{
    //   display: "flex",
    //   flexDirection: "row",
    //   flexWrap: "wrap",
    //   gap: "1rem",
    // }}
    onSubmit={handleSubmit}
    >
        <h1>Update your information</h1>
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
     
     
      <label >Email:</label>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      
      <label>Description:</label>
      <input
        name="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />


       {/* <label>Image Url:</label>
      <input
        name="imageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      /> */}


      <button type="submit">Edit</button>
    </form>
  );
};

export default UpdateClient;
