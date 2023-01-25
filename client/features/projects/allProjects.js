import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { fetchProjectsAsync, selectProjects  } from "../projects/allProjectsSlice";



const AllProjects = () => {
  const projects = useSelector(selectProjects);

  console.log("ALL PROJECT: ", projects)
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, [dispatch] );

  return (
    <div id="allProjects">
      <ul>
        { projects?.length ? projects.map((project) => (
          <li>
            <Link to={`/projects/${project.id}`}>
              <p>{project.status}</p>
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
