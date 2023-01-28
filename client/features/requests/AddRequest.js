import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectSingleProject, fetchSingleProjectAsync } from '../projects/singleProjectSlice'


const AddRequest = () => {
const [requestMessage, setRequestMessage] = useState("")

const {projectId} = useParams()
const dispatch = useDispatch()
const project = useSelector(selectSingleProject)

// const freelancerId = useSelector((state) => state.freelancerAuth.me.id)

useEffect(()=>{
dispatch(fetchSingleProjectAsync(projectId))
},[dispatch])
console.log("Project: ", project)

    const handleSubmit = () =>{
        console.log("HEEEEELLLOOOOO")
        }
  return (
    <div>
        <h1>Submit a proposal to work on:</h1>
        <h2>{ project  ? <Link to={`/projects/${project.singleProject.id}`}>{project.singleProject.description}</Link>:null}</h2>
        <h3>posted by:{ project.singleProject.id  ? <Link to={`/client-profile/${project.singleProject.client.id}`}> {project.singleProject.client.firstName} {project.singleProject.client.lastName}</Link>: null}</h3>
    <form 
    onSubmit={handleSubmit}
    >
        {/* <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="textarea" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <select name='dispatchRoute'>
            <option value={'client'}>Client</option>
            <option value={'freelancer'}>Freelancer</option>
          </select>
          <button type="submit">{}</button>
        </div> */}
      
        
    </form>
    </div>
  )
}

export default AddRequest