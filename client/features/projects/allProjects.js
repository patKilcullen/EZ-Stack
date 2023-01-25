import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { selectProjects } from "../projects/allProjectsSlice";
import { fetchProjectsAsync } from "../projects/allProjectsSlice";



const AllProjects = () => {
  const projects = useSelector(selectProjects);
  console.log("ALL PROJECT: ", projects)
  
  const dispatch = useDispatch()
  
 
  
  useEffect(() => {
    dispatch(fetchProjectsAsync());
    console.log("USE EFFECT ", projects)
  }, [dispatch]);

  return (
    <div id="allProjects">
      <ul>
        { projects ? projects.map((project) => (
          <li>
            <Link to={`/projects/${project.id}`}>
              <p>{project.type}</p>
              <p>{project.description}</p>
              <p>{project.category}</p>
            </Link>
          </li>
        )): null}
      </ul>
    </div>
  )
};

export default AllProjects
