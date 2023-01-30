import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchSingleFreelancerMessageAsync, selectSingleFreelancerMessage, sendFreelancerMessageAsync } from './freelancerSingleMessageSlice';

const IndividualMessagesFreelancer = () => {
  const freelancerId = useSelector((state) => state.freelancerAuth.me.id)
  const freelancer = useSelector((state) => state.freelancerAuth.me)
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const { id } = useParams()
  const messages = useSelector(selectSingleFreelancerMessage)
  

  const formSubmit = (e) => {
    e.preventDefault()
    console.log(content)
    dispatch(sendFreelancerMessageAsync({clientId: id, freelancerId, content, from: freelancer.username }))
  }

  useEffect(() => {
    dispatch(fetchSingleFreelancerMessageAsync({id, freelancerId}))
  }, [dispatch])

  return(
    <>
      {messages ? messages.map((message) => {
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
