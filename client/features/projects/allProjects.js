import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { fetchProjectsAsync, selectProjects, fetchProjectsByCategoryAsync  } from "../projects/allProjectsSlice";
import usePagination from "../freelancers/usePagimentation";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import Stack from "@mui/material/Stack";


const AllProjects = () => {
  const projects = useSelector(selectProjects);

  console.log("ALL PROJECT: ", projects)
  
  const dispatch = useDispatch()

  const [category, setCategory] = useState('')
  
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
          <Card sx={{ maxWidth: 345 }}>
          <CardContent>
          <Typography  variant="h2" component="div">
            {project.title}
            </Typography>
            <Typography  variant="h5" component="div">
            {project.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {project.status}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        </Link>
        </div>
        ))}
      </div> 
      </List>
        <Stack alignItems="center">
          <Pagination
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
