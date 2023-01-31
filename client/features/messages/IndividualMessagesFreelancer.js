import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchSingleFreelancerMessageAsync, selectSingleFreelancerMessage, sendFreelancerMessageAsync, updateMessageAsync } from './freelancerSingleMessageSlice';

const IndividualMessagesFreelancer = () => {
  const freelancerId = useSelector((state) => state.freelancerAuth.me.id)
  const freelancer = useSelector((state) => state.freelancerAuth.me)
  const [content, setContent] = useState('')
  const [render, setRender] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams()
  const messages = useSelector(selectSingleFreelancerMessage)
  

  const formSubmit = async (e) => {
    e.preventDefault()
    await dispatch(sendFreelancerMessageAsync({clientId: id, freelancerId, content, from: freelancer.username }))
    setRender(!render)
  }

  messages.map((msg) => {
    if(!msg.read && msg.from != freelancer.username){
      dispatch(updateMessageAsync({id: msg.id, read: true}))
    }
  })

  useEffect(() => {
    dispatch(fetchSingleFreelancerMessageAsync({id, freelancerId}))
  }, [dispatch, render])

  const copy =[...messages]

  const sorted = copy.sort((a,b) => {
    return a.id - b.id
  })
  
  return(
    <>
      {sorted ? sorted.map((message) => {
      return(
        <>
          <ul>
            <li><small><span>{message.from} - {message.createdAt}</span></small></li>
            <li>{message.content}</li>
          </ul>
        </>
      )
    }) : null}
    <form onSubmit={formSubmit}>
      <input value={content} name='content' type='text' onChange={(e) => setContent(e.target.value)} />
      <button type='submit'>Send</button>
    </form>
    </>
  )

}

export default IndividualMessagesFreelancer
