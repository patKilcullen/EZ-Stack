// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   fetchAllFreelancers,
//   selectAllFreelancers,
//   fetchFreelancersByCategoryAsync,
//   sortByReviews,
//   sortByCategory,
//   selectAllFreelancersByReviews,
//   selectAllFreelancersByCategory,

// } from "./allFreelancersSlice";
// import usePagination from "./usePaginatation";


// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Pagination from "@mui/material/Pagination";
// import Box from "@mui/material/Box";
// import { List } from "@mui/material";
// import Stack from "@mui/material/Stack";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import InputLabel from "@mui/material/InputLabel";




// const MostReviewedFreelancers = () => {
//   const dispatch = useDispatch();
//   const freelancers = useSelector(selectAllFreelancers);
//   const freelancersByReviews = useSelector(selectAllFreelancersByReviews)
//   const freelancersByCategory = useSelector(selectAllFreelancersByCategory)
  
//   const [category, setCategory] = useState("");
  

//   useEffect(() => {
//     dispatch(fetchAllFreelancers()).then(()=>{
//         dispatch(sortByReviews())
//     })

//   }, [dispatch]);
  

   
 
    


//   ////FOR PAGINATION/////
//   let [page, setPage] = useState(1);
//   const PER_PAGE = 10;

//   const count = Math.ceil(freelancers.length / PER_PAGE);
//   const _DATA = usePagination(freelancers, PER_PAGE);
  
//   const handleChange = (e, p) => {
//     setPage(p);
//     _DATA.jump(p);
//   };
// console.log("FREELANCERS ", freelancers)

//   return (
//     <div className="allViewContainer"
//     style={{marginBottom: "10px"}}
//     >

//       <div style={{marginTop:'1em'}} className="search">
//        <Link to={"/freelancers"}><Button variant='contained'>View Categories</Button></Link>
//       </div>
//       <Box p="5">
//         <List p="10" pt="3" spacing={2}>
//           <div className="allList">
//             {_DATA.currentData().map((freelancers) => (
//               <div className="card">
//                 <Link to={`/freelancers/${freelancers.id}`}>
//                   <Card 
//                     sx={{
//                       minWidth: 300, minHeight: 300, 
                      
//                       margin: "0 auto",
//                       padding: "0.3em",
//                     }}
//                   >
//                     <CardMedia
//                       sx={{ height: 140 }}
//                       image={freelancers.imageUrl}
//                       title="Freelancer"
//                     />
//                     <CardContent >
//                       <Typography color='primary' gutterBottom variant="h5" component="div">
//                         {freelancers.firstName} {freelancers.lastName}
//                       </Typography>
//                       <Typography color='primary' variant="body2">
//                         {freelancers.categories}
//                       </Typography>
//                       <Typography color='primary' variant="body2">
//                         {freelancers.ratingAvg === 1 ? (<p>{"★"}</p>) :freelancers.ratingAvg === 2 ? (<p>{"★★"}</p>):freelancers.ratingAvg === 3 ? (<p>{"★★★"}</p>) :freelancers.ratingAvg === 4 ? (<p>{"★★★★"}</p>):freelancers.ratingAvg === 5 ? (<p>{"★★★★★"}</p>): null}
//                       </Typography>
//                       <Typography color='primary' variant="body2">
//                         {freelancers.ratings ? `${freelancers.ratings.length} Reviews`: null}
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       <Button size="small" variant='contained'>Learn More</Button>
//                     </CardActions>
//                   </Card>
//                   <div>
//                   </div>
//                 </Link>
//               </div>
             
//             ))}
            

//           </div>
//         </List>
//         <Stack alignItems="center">
//           <Pagination
//           color='primary'
//             count={count}
//             size="large"
//             page={page}
//             variant="outlined"
//             shape="rounded"
//             onChange={handleChange}
//           />
//         </Stack>
//       </Box>
//     </div>
//   )}

//   export default MostReviewedFreelancers;


  import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllFreelancers,
  selectAllFreelancers,
  fetchFreelancersByCategoryAsync,
  sortByReviews,
  sortByCategory,
  selectAllFreelancersByReviews,
  selectAllFreelancersByCategory,

} from "./allFreelancersSlice";
import usePagination from "./usePaginatation";


import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";




const MostReviewedFreelancers = () => {
  const dispatch = useDispatch();
  const freelancers = useSelector(selectAllFreelancers);
  const freelancersByReviews = useSelector(selectAllFreelancersByReviews)
  const freelancersByCategory = useSelector(selectAllFreelancersByCategory)
  
  const [category, setCategory] = useState("");
  

  useEffect(() => {
    dispatch(fetchAllFreelancers()).then(()=>{
        dispatch(sortByReviews())
    })

  }, [dispatch]);
  

   
  const handleSort = () => { 
    dispatch(sortByReviews())
    console.log("SORTED BY REVIEWS ", freelancersByReviews)
  };

  const handleCategory = (evt) => {
    evt.preventDefault();
    console.log("handle category", category);
    dispatch(sortByCategory(category));
    console.log("FREELANCERS BY CAT ", freelancersByCategory)
  }
    


  ////FOR PAGINATION/////
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(freelancersByReviews.length / PER_PAGE);
  const _DATA = usePagination(freelancersByReviews, PER_PAGE);
  
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
console.log("FREELANCERS ", freelancers)

  return (
    <div className="allViewContainer"
    style={{marginBottom: "10px"}}
    >

      <div style={{marginTop:'1em'}} className="search">
       <Link to={"/freelancers"}><Button variant='contained'>View Categories</Button></Link>
      </div>
      <Box p="5">
        <List p="10" pt="3" spacing={2}>
          <div className="allList">
            {_DATA.currentData().map((freelancers) => (
              <div className="card">
                <Link to={`/freelancers/${freelancers.id}`}>
                  <Card 
                    sx={{
                      minWidth: 300, minHeight: 300, 
                      
                      margin: "0 auto",
                      padding: "0.3em",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
                      image={freelancers.imageUrl}
                      title="Freelancer"
                    />
                    <CardContent >
                    <Typography
                        color="primary"
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {freelancers.firstName} {freelancers.lastName}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "bolder",
                        }}
                      >
                        <Typography color="primary" variant="body2">
                          {freelancers.category}
                        </Typography>
                        <Typography variant="body2">
                          Starting Rate: ${freelancers.hourlyRate}
                        </Typography>
                      </div>
                      <hr
                        style={{
                          border: "none",
                          height: "1px",
                          color: "#333",
                          backgroundColor: "#333",
                        }}
                      ></hr>

                      <Typography variant="body2" color="secondary">
                        Specialties: {freelancers.specialties}
                      </Typography>

                      <br></br>
                      <Typography
                        variant="body1"
                        align="center"
                        overflowwrap="break-word"
                      >
                        {freelancers.bio}
                      </Typography>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bolder",
                        }}
                      >
                        <Typography color="primary" variant="body2">
                          {freelancers.ratingAvg === 1 ? (
                            <p>{"★"}</p>
                          ) : freelancers.ratingAvg === 2 ? (
                            <p>{"★★"}</p>
                          ) : freelancers.ratingAvg === 3 ? (
                            <p>{"★★★"}</p>
                          ) : freelancers.ratingAvg === 4 ? (
                            <p>{"★★★★"}</p>
                          ) : freelancers.ratingAvg === 5 ? (
                            <p>{"★★★★★"}</p>
                          ) : null}
                        </Typography>
                        <Typography color="primary" variant="body2">
                          {freelancers.ratings
                            ? `( ${freelancers.ratings.length} Reviews)`
                            : null}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button size="small"  fullWidth variant='contained'>Learn More</Button>
                    </CardActions>
                  </Card>
                  <div>
                  {/* { <ViewAvgRating id={freelancers.id} />} */}
                  </div>
                </Link>
              </div>
             
            ))}
            

          </div>
        </List>
        <Stack alignItems="center">
          <Pagination
          color='primary'
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </div>
  )}

  export default MostReviewedFreelancers;