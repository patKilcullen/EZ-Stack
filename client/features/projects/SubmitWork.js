import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { editSingleProject, fetchSingleProjectAsync, selectSingleProject } from "./singleProjectSlice";

const SubmitWork = () => {
  const {id} = useParams() 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const freelancer = useSelector((state) => state.freelancerAuth.me);
  const project = useSelector(selectSingleProject)
  console.log(project)

  const formSubmit = async (e) => {
    e.preventDefault()
    const work = e.target.work.value
    await dispatch(editSingleProject({id, work}))
    navigate(`/projects/${id}`)
  }


  useEffect(() => {
    dispatch(fetchSingleProjectAsync(id))
  }, [dispatch])

  if(project.singleProject.freelancerId === freelancer.id && !project.singleProject.work){
  return(
    <>
      <form onSubmit={formSubmit}>
        <input name='work' type={'text'} />
        <button type="submit">Submit Work For Review</button>
      </form>
    </>
  )
  }

  if(project.singleProject.freelancerId === freelancer.id && project.singleProject.work){
    return(
      <>
        <h1>You already have work submitted for review!</h1>
      </>
    )
  }
  
  if(project.singleProject.freelancerId != freelancer.id){
    return(
      <>
        <h1>You are not authorized to view this page!</h1>
      </>
    )
  }

}

export default SubmitWork
