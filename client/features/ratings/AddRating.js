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
     <form className="signUpForm" onSubmit={handlePostRating} name={name}>
        <div >
          <TextField id="outlined-basic" label="rating" name="rating"  variant="filled" sx={{ backgroundColor: "#f7f4eb" }}/>
        </div>
        <div>
          <TextField id="outlined-basic" label="review" name="review"  variant="filled" sx={{ backgroundColor: "#f7f4eb" }}/>
        </div>
          <Button type="submit" variant="contained">Leave Review</Button>
        
      </form>
      ): null}
  </div>
  );
};

export default AddRating;