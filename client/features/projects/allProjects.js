import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { 
  fetchProjectsAsync, 
  selectProjects, 
  selectProjectsByCategory,
  sortByCategory,  
  sortByLiked
} from "../projects/allProjectsSlice";
import usePagination from "../freelancers/usePaginatation";

import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";


import { fetchLikedProjectsAsync, likeProjectAsync, selectLikedProjects } from "./likedProjectsSlice";


const AllProjects = () => {
  
  const projectsByCat = useSelector(selectProjectsByCategory)
  const projects = useSelector(selectProjects);
  const freelancer = useSelector((state) => state.freelancerAuth.me.id)
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id)

  const liked = useSelector(selectLikedProjects)
  
  const dispatch = useDispatch()

  const [category, setCategory] = useState('')

  const likedIds = []

  console.log(likedIds)
  
  useEffect(() => {
    dispatch(fetchProjectsAsync());
    if(freelancer){
    dispatch(fetchLikedProjectsAsync(freelancer))
    }
  }, [dispatch]);

  const handleCategory = (evt) => {
    evt.preventDefault();
    if(category === 'Liked'){
    dispatch(sortByLiked(likedIds))
    }else{
    dispatch(sortByCategory(category));
    }
  }



    ////FOR PAGINATION/////
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
  
    const count = Math.ceil(projects.length / PER_PAGE);
    const _DATA = usePagination(projects, PER_PAGE);

    const countB = Math.ceil(projectsByCat.length / PER_PAGE);
    const _DATAB = usePagination(projectsByCat, PER_PAGE);


  
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };
    
    const handleChangeCat = (e, p) => {
      setPage(p);
      _DATAB.jump(p);
    };
  
    ///////////////////////
if (projectsByCat.length) {
  return (
<div className="allViewContainer">
<div style={{marginTop: 10}}>
          <Typography fontWeight={"bold"} color="primary">Search by Categories and Specialties</Typography>
          </div>
          <div>
      <form onSubmit={handleCategory}>
        {/* category  */}
        <InputLabel>Categories</InputLabel>
        <Select
          name="category"
          fullWidth
          // label="Category"
          value={category}
          color="primary"
          sx={{ m: 1, width: "20ch" }}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="all">
            All Projects
          </MenuItem>
          <MenuItem value={"Python Developer"}>Python Developer</MenuItem>
          <MenuItem value={"Javascript Developer"}>
            Javascript Developer{" "}
          </MenuItem>
          <MenuItem value={"HTML & CSS Developer"}>
            HTML & CSS Developer
          </MenuItem>
          <MenuItem value={"Android Developer"}>Android Developer</MenuItem>
          <MenuItem value={'Liked'}>Liked</MenuItem>
        </Select>
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      </div>
    <div className='allList'>
      
        {_DATAB.currentData().map((project) => (
          <div className='card'>
            <Link to={`/projects/${project.id}`}>
          <Card  sx={{ minWidth: 300, minHeight: 300, 
            backgroundColor:"#F5F5F5", 
            boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            ':hover': {
              boxShadow: 20, // theme.shadows[20]
            },
            }}>
          <CardContent>
          {liked ? liked.map((like) => {
              likedIds.push(like.project.id)
                  if(like.project.id == project.id){
                    return <FavoriteIcon></FavoriteIcon>
                  }
                }) : null}
          <Typography fontFamily={"Playfair Display serif"}  align="center" variant="h5" component="div">
            {project.title}
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>
            <Typography color='primary'  variant="body1" component="div">
            {project.category}
            </Typography>
            <br></br>
            <Typography variant="body2" color='primary'>
            Status: {project.status}
            </Typography>
          </CardContent>
          <br></br>
          <br></br>
          <CardActions>
            <Button size="small" fullWidth variant='contained'>Learn More</Button>
          </CardActions>
        </Card>
        </Link>
        </div>
        ))}
      </div> 
        <Stack alignItems="center">
          <Pagination
          color='primary'
            count={countB}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChangeCat}
          />
        </Stack>
    </div>
  )}
  return (
    <div className="allViewContainer">
        <form onSubmit={handleCategory}>
          {/* category  */}
          <div style={{marginTop: 10}}>
          <Typography fontWeight={"bold"} color="primary">Search by Categories</Typography>
          </div>
          {/* <InputLabel>Categories</InputLabel> */}
          <Select
            name="category"
            fullWidth
            // label="Category"
            value={category}
            color="primary"
            sx={{ m: 1, width: "20ch" }}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">
              All Projects
            </MenuItem>
            <MenuItem value={"Python Developer"}>Python Developer</MenuItem>
            <MenuItem value={"Javascript Developer"}>
              Javascript Developer{" "}
            </MenuItem>
            <MenuItem value={"HTML & CSS Developer"}>
              HTML & CSS Developer
            </MenuItem>
            <MenuItem value={"Android Developer"}>Android Developer</MenuItem>
            <MenuItem value={'Liked'}>Liked</MenuItem>
          </Select>
          <Button type="submit" variant="contained">
            Search
          </Button>
        </form>
    
      <Box p="5">
        <List p="10" pt="3" spacing={2}>
        <div className="allList" >  
        {_DATA.currentData().map((project) => (
          <div className='card'>
            <Link to={`/projects/${project.id}`}>
          <Card  sx={{ minWidth: 300, minHeight: 300, 
            backgroundColor:"#F5F5F5", 
            boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            ':hover': {
              boxShadow: 20, // theme.shadows[20]
            },
            }}>
          <CardContent>
          {liked ? liked.map((like) => {
              likedIds.push(like.project.id)
                  if(like.project.id == project.id){
                    return <FavoriteIcon></FavoriteIcon>
                  }
                }) : null}
          <Typography fontFamily={"Playfair Display serif"}  align="center" variant="h5" component="div">
            {project.title}
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>
            <Typography color='primary'  variant="body1" component="div">
            {project.category}
            </Typography>
            <br></br>
            <Typography variant="body2" color='primary'>
            Status: {project.status}
            </Typography>
          </CardContent>
            <br></br>
            <br></br>
            <CardActions>
              <Button size="small" fullWidth variant='contained'>Learn More</Button>
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
  )
};

export default AllProjects
