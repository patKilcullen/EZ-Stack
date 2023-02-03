import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllFreelancers,
  selectAllFreelancers,
  fetchFreelancersByCategoryAsync,
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

  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchAllFreelancers());
  }, [dispatch]);

  const handleSearch = () => {
    const cat = category.charAt(0).toUpperCase();
    const newCat = cat + category.slice(1);
    dispatch(fetchFreelancersByCategoryAsync(newCat));
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

  ///////////////////////

  return (
    <div className="allViewContainer"
    style={{marginBottom: "10px"}}
    >
      <div className="search">
        <input
          className="searchBar"
          type="text"
          placeholder="search freelancers by category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          onKeyDown={handleSearch}
        />
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
                      <Typography color='primary' gutterBottom variant="h5" component="div">
                        {freelancers.firstName} {freelancers.lastName}
                      </Typography>
                      <Typography color='primary' variant="body2">
                        {freelancers.categories}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button  fullWidth size="small" variant='contained'>Learn More</Button>
                    </CardActions>
                  </Card>
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
  );
};
export default AllFreelancers;
