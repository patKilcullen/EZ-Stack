import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProjectAsync, editSingleProject } from "./singleProjectSlice";
import Button from '@mui/material/Button';


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
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
        <option>Pending</option>
        <option>Ongoing</option>
        <option>Complete</option>
        </select>
        <Button  variant="contained" type="submit">Edit Status</Button>
        </div> ) : null }

        {client === projectClientId ? (
          <div>
            <div>
        <textarea
        className = 'descriptionInput'
          name="description"
          value={description}
          placeholder="Edit Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div>
        <input
          className="catInput"
          name="category"
          value={category}
          placeholder='edit category'
          onChange={(e) => setCategory(e.target.value)}
        />
        </div>
        <Button variant="contained" type="submit">Edit Project</Button>
        </div>
        ) : null} 
        
      </form>
    </div>
  );
};

export default EditProject;