import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { fetchProjectsByClientAsync, selectProjects  } from "../projects/allProjectsSlice";



const AllClientProjects = () => {
  const projects = useSelector(selectProjects);

  console.log("ALL PROJECT: ", projects)
  
  const dispatch = useDispatch()

  const { clientId } = useParams()
  
  useEffect(() => {
    dispatch(fetchProjectsByClientAsync(clientId));
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

export default AllClientProjects
