import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchSingleClientMessageAsync, selectSingleClientMessage, sendClientMessageAsync } from './clientSingleMessageSlice';
import { updateMessageAsync } from './freelancerSingleMessageSlice';

const IndividualMessagesClient = () => {
  const clientId = useSelector((state) => state.clientAuth.clientMe.id);
  const client = useSelector((state) => state.clientAuth.clientMe);
  const [render, setRender] = useState(false)
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const { id } = useParams()
  const messages = useSelector(selectSingleClientMessage)



  const formSubmit = async (e) => {
    e.preventDefault()
    await dispatch(sendClientMessageAsync({freelancerId: id, clientId, content, from: client.username }))
    setRender(!render)
  }

  messages.map((msg) => {
    if(!msg.read && msg.from != client.username){
      dispatch(updateMessageAsync({id: msg.id, read: true}))
    }
  })

  useEffect(() => {
    dispatch(fetchSingleClientMessageAsync({id, clientId}))
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

export default IndividualMessagesClient
