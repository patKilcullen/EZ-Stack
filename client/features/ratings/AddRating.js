import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProjectAsync, editSingleProject } from "../projects/singleProjectSlice";
import { addRatingAsync } from "./ViewAllSlice";




// MATERIAL UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import Rating from '@mui/material/Rating';
////////////////

const statuses = ["Pending", "Ongoing", "Complete"];

const AddRating = (props) => {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  

  const freelancer = useSelector((state) => state.freelancerAuth.me.id)

  const client = useSelector((state) => state.clientAuth.clientMe.id)

  const { projectId, projectClientId, projectFreelancerId } = props

 
  const freelancerId = projectFreelancerId
  

  const dispatch = useDispatch();
  
//   useEffect(() => {
//     dispatch(fetchSingleProjectAsync(projectId))
//     .then((res) => {
//       const {status, description, category } = res.payload;

//       setRating(status);
//       setReview(description);
//     });
//   }, [dispatch]);

  const handlePostRating = (e) => {
    e.preventDefault();
    const rating = e.target.rating.value
   
    
    const review = e.target.review.value
    dispatch(
      addRatingAsync({ freelancerId, rating, review })
    ).then(() => {
      dispatch(fetchSingleProjectAsync(projectId));
    });
  };

  
  return (
    <div >
        {client === projectClientId ? (
          <Box
          sx={{
          marginTop: 3,
          marginBottom: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:"#F5F5F5",
          padding:"1em 1em",
          borderRadius: "4px",
          width: 600,
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
          }}
        >
     <form 
     style={{width:600}}
     className="signUpForm" onSubmit={handlePostRating} name={name}>
        <Typography color='primary' component="h4" variant="h4">
          Add a Review!
        </Typography>

        <hr></hr>
        <br></br>

        <div 
        style={{display: "flex", justifyContent: "center", alignContent: "center", marginBottom: "30px"}}
        >
        <Rating
        name="rating"
        defaultValue={1}
      />
        </div>
        <div>
          <TextField id="outlined-basic" label="review" name="review"  variant="filled" fullWidth
            multiline
            rows={4} 
            sx={{ backgroundColor:"#F5F5F5", }}/>
        </div>
        <br></br>
        <br></br>
          <Button type="submit" fullWidth variant="contained">Leave Review</Button>
        
      </form>
     </Box>
      ): null}
  </div>
  );
};

export default AddRating;