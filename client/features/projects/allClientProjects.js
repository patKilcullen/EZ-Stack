import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { fetchProjectsByClientAsync, selectProjects  } from "../projects/allProjectsSlice";
import EditProject from "./editProjectForm";



const AllClientProjects = () => {
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch()
  
  const client = useSelector((state) => state.clientAuth.clientMe.id)

  
  
  useEffect(() => {
    dispatch(fetchProjectsByClientAsync(client));
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
