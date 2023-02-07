import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { fetchProjectsAsync, selectProjects, fetchProjectsByCategoryAsync  } from "../projects/allProjectsSlice";
import usePagination from "../freelancers/usePaginatation";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import Stack from "@mui/material/Stack";
import { likeProjectAsync } from "./likedProjectsSlice";


const AllProjects = () => {
  const projects = useSelector(selectProjects);
  const freelancer = useSelector((state) => state.freelancerAuth.me.id)
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id)
  console.log("projects", projects)
  
  
  const dispatch = useDispatch()

  const [category, setCategory] = useState('')

  const likeProject = (freelancerId, projectId) => {
    dispatch(likeProjectAsync({freelancerId, projectId}))
  }
  
  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, [dispatch] );

  const handleSearch = () =>{
    const cat = category.charAt(0).toUpperCase()
    const newCat = cat + category.slice(1)
    dispatch(fetchProjectsByCategoryAsync(newCat))
  }


    ////FOR PAGINATION/////
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
  
    const count = Math.ceil(projects.length / PER_PAGE);
    const _DATA = usePagination(projects, PER_PAGE);
    console.log("_Data project:", _DATA.currentData())
    
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };
  
    ///////////////////////

  return (
    <div className="allViewContainer">
      <div className='search'>
      <input className='searchBar' type='text' placeholder='search projects by category' value={category}
       onChange={event => setCategory(event.target.value)} onKeyDown={handleSearch}/>
    </div>
    <Box p="5">
        <List p="10" pt="3" spacing={2}>
    <div className='allList'>
      
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
