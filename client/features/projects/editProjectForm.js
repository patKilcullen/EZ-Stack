import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProjectAsync, editSingleProject } from "./singleProjectSlice";

const EditProject = (props) => {
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const freelancer = useSelector((state) => state.freelancerAuth.me.id)

  const client = useSelector((state) => state.clientAuth.clientMe.id)

  const { projectId, projectClientId, projectFreelancerId } = props

  const id = projectId
  

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchSingleProjectAsync(projectId)).then((res) => {
      const {status, description, category } = res.payload;

      setStatus(status);
      setDescription(description);
      setCategory(category);
    });
  }, [dispatch]);

  const handleEditProject = (e) => {
    e.preventDefault();
    dispatch(
      editSingleProject({ id, status, description, category })
    ).then(() => {
      dispatch(fetchSingleProjectAsync(projectId));
    });
  };

  
  return (
    <div id="editProject">
      <form onSubmit={handleEditProject}>
        {freelancer === projectFreelancerId ? (
        <div id='dropDown'>
        <label htmlFor="status">Status:</label>
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
        <option>Pending</option>
        <option>Ongoing</option>
        <option>Complete</option>
        </select>
        <button type="submit">Edit Project</button>
        </div> ) : null }

        {client === projectClientId ? (
          <div>
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="category">Category:</label>
        <input
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Edit Project</button>
        </div>
        ) : null} 
        
      </form>
    </div>
  );
};

export default EditProject;