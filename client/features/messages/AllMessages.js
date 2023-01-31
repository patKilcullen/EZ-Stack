import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchClientMessagesAsync, selectClientMessages } from './clientMessagesSlice';
import { fetchFreelancerMessagesAsync, selectFreelancerMessages } from './freelancerMessagesSlice';

const AllMessages = () => {
  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
  const [clientNew, setClientNew] = useState(false)
  const [freelancerNew, setFreelancerNew] = useState(false)
  const client = useSelector((state) => state.clientAuth.clientMe);
  const clientId = useSelector((state) => state.clientAuth.clientMe.id);
  const freelancerId = useSelector((state) => state.freelancerAuth.me.id);
  const freelancer = useSelector((state) => state.freelancerAuth.me)
  const dispatch = useDispatch()

 

  if(clientIsLoggedIn){
    const messages = useSelector(selectClientMessages)
    const filteredMessages = messages.filter((message) => {
      return message.from !== client.username
    })

    let newMsgs = []
    for(const a of filteredMessages){
      const containsUser = newMsgs.some((msg) => {
        return msg.from === a.from
      })
      if(!containsUser){
        newMsgs.push(a)
      }
    }

    messages.map((msg) => {
      if(!msg.read && msg.from != client.username && !clientNew){
        setClientNew(true)
      }
    })
  
  
    useEffect(() => {
      dispatch(fetchClientMessagesAsync(clientId))    
    }, [dispatch])

    

  return(
  <div className='messages'>
    <h1 className={clientNew ? 'newMessage' : 'noNewMessage'}>New Messages</h1>
      {newMsgs ? newMsgs.map((message) => {
        return(
          <>
            <Link to={`/messages/${message.freelancerId}`}>{message.from}</Link>
          </>
        )
      }) : null}
  </div>
  )
  }
  
  if(freelancerIsLoggedIn){
    const messages = useSelector(selectFreelancerMessages)
    const filteredMessages = messages.filter((message) => {
      return message.from !== freelancer.username
    })
    let newMsgs = []
    for(const a of filteredMessages){
      const containsUser = newMsgs.some((msg) => {
        return msg.from === a.from
      })
      if(!containsUser){
        newMsgs.push(a)
      }
    }

    messages.map((msg) => {
      if(!msg.read && msg.from != freelancer.username && !freelancerNew){
        setFreelancerNew(true)
      }
    })

    console.log(freelancerNew)

    useEffect(() => {
      dispatch(fetchFreelancerMessagesAsync(freelancerId))
    }, [dispatch])
    return(
      <div className='messages'>
        <h1 className={freelancerNew ? 'newMessage' : 'noNewMessage'}>New Messages</h1>
        {newMsgs ? newMsgs.map((message) => {
          
          return(
            <>
              <Link to={`/messages/${message.clientId}`}>{message.from}</Link>
            </>
          )
        }) : null}
      </div>
    )
  }
}

export default AllMessages
