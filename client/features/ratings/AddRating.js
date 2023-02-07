import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSingleProjectAsync, editSingleProject } from "../projects/singleProjectSlice";
import { addRatingAsync } from "./ViewAllSlice";
import { fetchRatingByFreelancerAndProject, selectSingleRating } from "./singleRatingSlice";



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
import Card from '@mui/material/Card';
////////////////

const statuses = ["Pending", "Ongoing", "Complete"];

const AddRating = (props) => {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

// CHARACTER LIMIT
  const [characterError, setCharacterError] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  const navigate = useNavigate()
  

  const freelancer = useSelector((state) => state.singleProject.singleProject.freelancer)
  const singleRating = useSelector(selectSingleRating)
  console.log("SINGLE RATING: ", singleRating)

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
useEffect(()=>{
dispatch(fetchRatingByFreelancerAndProject({projectId, freelancerId: projectFreelancerId}))
}, [dispatch])

  const handlePostRating = (e) => {
     e.preventDefault();
    //  character limit
// if(e.target.value.length <= 20){
    const rating = e.target.rating.value
   
    const review = e.target.review.value
    setCharacterError(false)
    dispatch(
      addRatingAsync({ freelancerId, rating, review, projectId })
    ).then(() => {
      dispatch(fetchSingleProjectAsync(projectId)).then(()=>{
        window.location.reload()
        // navigate(`/projects/${projectId}`)

      })
      
    });
  // }else{
  //   setCharacterError(true)
  // }
}

  
  return (
    <div >
{/* character limit */}
      {/* {characterError} */}

      { singleRating.singleRating ? 
      <div>
      <h1>You already submitted a freelancer ratingfor this project  </h1>
    
      <div >
 
             <Card sx={{ width: 500, margin: "10%", marginLeft: 0 }}>
          
          { freelancer ? <Typography variant="body2" color='primary'>
          Freelancer: {freelancer.firstName}{" "}
          {freelancer.lastName}

            </Typography>: null}
          <Typography variant="body2" color='primary'>
            {singleRating.singleRating.rating === 1 ? (<p>{"★"}</p>) :singleRating.singleRating.rating === 2 ? (<p>{"★★"}</p>):singleRating.singleRating.rating === 3 ? (<p>{"★★★"}</p>) :singleRating.singleRating.rating === 4 ? (<p>{"★★★★"}</p>):singleRating.singleRating.rating === 5 ? (<p>{"★★★★★"}</p>): null}
            </Typography>
            <Typography variant="body2" color='primary'>
            {singleRating.singleRating.review}
            </Typography>
          
            </Card>
          </div>
          </div>
  
      
      
      
      :
        client === projectClientId ? (
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
          // character limit
          // error={characterError}
          // helperText={
          //   characterError
          //     ? "Character limit exceeded (must be 20 characters or less"
          //     : null
          // }
          // value={reviewMessage}
          //       onChange={handleChange}


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