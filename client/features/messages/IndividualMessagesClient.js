import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchSingleClientMessageAsync, selectSingleClientMessage, sendClientMessageAsync } from './clientSingleMessageSlice';
import { updateMessageAsync } from './freelancerSingleMessageSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import Person2TwoToneIcon from '@mui/icons-material/Person2TwoTone';
import Typography from '@mui/material/Typography';

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
    setContent("")
  }

  messages.map((msg) => {
    if(!msg.read && msg.from != client.username){
      dispatch(updateMessageAsync({id: msg.id, read: true}))
    }
  })

  const backButton = () => {
    window.history.back()
  }

  useEffect(() => {
    dispatch(fetchSingleClientMessageAsync({id, clientId}))
  }, [dispatch, render])

  const copy =[...messages]

  const sorted = copy.sort((a,b) => {
    return a.id - b.id
  })

  
  return(
    <div
    className="individual-mssg"
    style={{
      overflowY: "auto",
      padding: "10px",
      backgroundColor: "#F5F5F5",
      margin: "20px 20px",
      width: "60vw",
      height: "60vh",
      alignContent: "center",
      borderRadius: "4px",
      boxShadow: "1px 3px 3px 1px",
    }}
  >

    <Typography
        color="primary"
        component="div"
        marginTop={5}
        marginBottom={3}
        variant="h4"
        align='center'
      >
        Messages
        <ForumTwoToneIcon size="large"/>
      </Typography>

    <ArrowBackIcon className='backArrow' onClick={backButton}></ArrowBackIcon>
   

    {sorted
      ? sorted.map((message) => {
          return (
            <div
              className="mssg-list"
            >
              <div className="single-mssg" 
              style={{ 
                margin: "15px 15px", 
                borderRadius: "4px", 
                backgroundColor: "lightgray", 
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
                }}>
                <div
                  className="author"
                  style={{ fontWeight: "bold", margin: "0 8px 0 0" }}
                >
                  <small>
                    <span
                     style={{ marginLeft: "5px" }}
                    >
                       {<Person2TwoToneIcon color="secondary" size="small" />}
                      from: {message.from} - 
                      at: {message.createdAt}
                    </span>
                  </small>
                </div>
                <div
                  className="mssg-content"
                  style={{ margin: "10px 10px", fontSize: "20px", overflowwrap:"break-word" }}
                >
                  {message.content}
                </div>
              </div>
            </div>
          );
        })
      : null}

    <form onSubmit={formSubmit}>
      <textarea
        value={content}
        name="content"
        type="text"
        style={{ width: "100%",
          padding: "12px 20px",
          height:"75px",
          boxSizing: "border-box",
          border: "2px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#f8f8f8",
          resize: "none"}}
        onChange={(e) => setContent(e.target.value)}
      />
      <button 
      type="submit"
      style={{
        position: "relative",
        display: "block",
        width: "100px",
        height: "36px",
        borderRadius: "18px",
        backgroundColor: "#1c89ff",
        border: "solid 1px transparent",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "300",
        cursor: "pointer",
        marginTop: "5px"
      }}
      >Send</button>
    </form>
  </div>

  )
}

export default IndividualMessagesClient
