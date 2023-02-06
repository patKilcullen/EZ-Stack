import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllFreelancers,
  selectAllFreelancers,
  fetchFreelancersByCategoryAsync,
  sortByCategory,
  selectAllFreelancersByReviews,
} from "./allFreelancersSlice";
import usePagination from "./usePagimentation";


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





const AllFreelancers = () => {
  const dispatch = useDispatch();
  const freelancers = useSelector(selectAllFreelancers);
  const freelancersByReviews = useSelector(selectAllFreelancersByReviews)
  
  const [category, setCategory] = useState("");
  

  useEffect(() => {
    dispatch(fetchAllFreelancers())

  }, [dispatch]);
  

   
  const handleSort = () => { 
    dispatch(sortByCategory())
  };

  ////FOR PAGINATION/////
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(freelancers.length / PER_PAGE);
  const _DATA = usePagination(freelancers, PER_PAGE);

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
       <Button onClick={() => handleSort()} variant='contained'>Most Reviewed</Button>
      </div>
      {freelancersByReviews.length ? (
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
                      <Typography color='primary' gutterBottom variant="h5" component="div">
                        {freelancers.firstName} {freelancers.lastName}
                      </Typography>
                      <Typography color='primary' variant="body2">
                        {freelancers.categories}
                      </Typography>
                      <Typography color='primary' variant="body2">
                        {freelancers.ratingAvg === 1 ? (<p>{"★"}</p>) :freelancers.ratingAvg === 2 ? (<p>{"★★"}</p>):freelancers.ratingAvg === 3 ? (<p>{"★★★"}</p>) :freelancers.ratingAvg === 4 ? (<p>{"★★★★"}</p>):freelancers.ratingAvg === 5 ? (<p>{"★★★★★"}</p>): null}
                      </Typography>
                      <Typography color='primary' variant="body2">
                        {`${freelancers.ratings.length} Reviews`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant='contained'>Learn More</Button>
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
      ): 
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
                      <Typography color='primary' gutterBottom variant="h5" component="div">
                        {freelancers.firstName} {freelancers.lastName}
                      </Typography>
                      <Typography color='primary' variant="body2">
                        {freelancers.categories}
                      </Typography>
                      <Typography color='primary' variant="body2">
                        {freelancers.ratingAvg === 1 ? (<p>{"★"}</p>) :freelancers.ratingAvg === 2 ? (<p>{"★★"}</p>):freelancers.ratingAvg === 3 ? (<p>{"★★★"}</p>) :freelancers.ratingAvg === 4 ? (<p>{"★★★★"}</p>):freelancers.ratingAvg === 5 ? (<p>{"★★★★★"}</p>): null}
                      </Typography>
                      <Typography color='primary' variant="body2">
                        {`${freelancers.ratings.length} Reviews`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant='contained'>Learn More</Button>
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
      </Box> }
    </div>
  );
};
export default AllFreelancers;
