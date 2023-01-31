import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { fetchProjectsAsync, selectProjects, fetchProjectsByCategoryAsync  } from "../projects/allProjectsSlice";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



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

  return (
    <div className="allViewContainer">
      <div className='search'>
      <input className='searchBar' type='text' placeholder='search projects by category' value={category}
       onChange={event => setCategory(event.target.value)} onKeyDown={handleSearch}/>
    </div>
    <div className='allList'>
        {projects.map((project) => (
          <div className='card'>
            <Link to={`/projects/${project.id}`}>
          <Card sx={{ maxWidth: 345 }}>
          <CardContent>
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
    </div>
  )
};

export default AllProjects
