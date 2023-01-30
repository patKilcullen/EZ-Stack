import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchSingleClientMessageAsync, selectSingleClientMessage, sendClientMessageAsync } from './clientSingleMessageSlice';

const IndividualMessagesClient = () => {
  const clientId = useSelector((state) => state.clientAuth.clientMe.id);
  const client = useSelector((state) => state.clientAuth.clientMe);
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const { id } = useParams()
  const messages = useSelector(selectSingleClientMessage)



  const formSubmit = (e) => {
    e.preventDefault()
    console.log(content)
    dispatch(sendClientMessageAsync({freelancerId: id, clientId, content, from: client.username }))
  }

  useEffect(() => {
    dispatch(fetchSingleClientMessageAsync({id, clientId}))
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

export default IndividualMessagesClient
