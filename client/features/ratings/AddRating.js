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
import { fetchRatingsByFreelancerAsync, selectRatings } from '../ratings/ViewAllSlice';
import { fetchSingleFreelancer, updateFreelancerAsync } from "../freelancers/singleFreelancerSlice";
const statuses = ["Pending", "Ongoing", "Complete"];

const AddRating = (props) => {
  
// CHARACTER LIMIT
  const [characterError, setCharacterError] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  

  const freelancer = useSelector((state) => state.singleProject.singleProject.freelancer)
  const singleRating = useSelector(selectSingleRating)
  

  const client = useSelector((state) => state.clientAuth.clientMe.id)

  const { projectId, projectClientId, projectFreelancerId } = props

 
  const freelancerId = projectFreelancerId
  const reviews = useSelector(selectRatings)
  const id = freelancerId

  const ratings = reviews.map((review)=>review.rating)
  
  const ratingSum = ratings.reduce((accumulator, value) =>{
    return accumulator + value;
  }, 0)
  const ratingAvg = Math.round(ratingSum / ratings.length)

  
  const dispatch = useDispatch();
  
 useEffect(() => {
   dispatch(fetchRatingsByFreelancerAsync(freelancerId))
   dispatch(fetchRatingByFreelancerAndProject({projectId, freelancerId: projectFreelancerId}))
   
  }, [dispatch]);
 
  const  handlePostRating = (e) => {
     e.preventDefault();
   
    const rating = e.target.rating.value
   
    const review = e.target.review.value
    
    setCharacterError(false)
    //ratings.push(parseInt(rating))
     dispatch(addRatingAsync({ freelancerId, rating, review, projectId })).then(()=>window.location.reload())
     
    
    //dispatch(fetchRatingsByFreelancerAsync(freelancerId))
    //dispatch(updateFreelancerAsync({id, ratingAvg}))
     
  };
       



  
  return (
    <div >
{/* character limit */}
      {/* {characterError} */}

      { singleRating.singleRating ? 
      <div>
      <h1>You already submitted a freelancer rating for this project  </h1>
    
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

        <hr
        style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
        ></hr>
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


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSingleProjectAsync, editSingleProject } from "../projects/singleProjectSlice";
// import { addRatingAsync } from "./ViewAllSlice";




// // MATERIAL UI
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import InputLabel from "@mui/material/InputLabel";
// import { fetchRatingsByFreelancerAsync, selectRatings } from '../ratings/ViewAllSlice';

// import Rating from '@mui/material/Rating';
// import { fetchSingleFreelancer, updateFreelancerAsync } from "../freelancers/singleFreelancerSlice";
// ////////////////

// const statuses = ["Pending", "Ongoing", "Complete"];

// const AddRating = (props) => {
  
//   const [rating, setRating] = useState("");
//   const [review, setReview] = useState("");


  

//   const freelancer = useSelector((state) => state.freelancerAuth.me.id)

//   const client = useSelector((state) => state.clientAuth.clientMe.id)

//   const { projectId, projectClientId, projectFreelancerId } = props

//   const reviews = useSelector(selectRatings)

 
//   const freelancerId = projectFreelancerId

//   const id = freelancerId

//   const dispatch = useDispatch();

//   const ratings = reviews.map((review)=>review.rating)
// const ratingSum = ratings.reduce((accumulator, value) =>{
//   return accumulator + value;
// }, 0)
// const ratingAvg = Math.round(ratingSum / ratings.length)


  
//  useEffect(() => {
//   dispatch(fetchRatingsByFreelancerAsync(freelancerId))
//   dispatch(fetchSingleFreelancer(freelancerId))
  
//  }, [dispatch]);

//   const handlePostRating = (e) => {
//     e.preventDefault();
//     const rating = e.target.rating.value
//     const review = e.target.review.value
//     ratings.push(parseInt(rating))
//     dispatch(
//       addRatingAsync({ freelancerId, rating, review })
//     ).then(() => {dispatch(updateFreelancerAsync({id, ratingAvg})).then(()=> window.location.reload())
//       console.log("NEW REVIEWS ", reviews)
//     });
//   };

  
//   return (
//     <div >
//         {client === projectClientId ? (
//      <form className="signUpForm" onSubmit={handlePostRating} name={name}>
//         <div >
//         <Rating
//         name="rating"
//         defaultValue={1}
//       />
//         </div>
//         <div>
//           <TextField id="outlined-basic" label="review" name="review"  variant="filled" sx={{ backgroundColor: "#f7f4eb" }}/>
//         </div>
//           <Button type="submit" variant="contained">Leave Review</Button>
        
//       </form>
//       ): null}
//   </div>
//   );
// };

// export default AddRating;