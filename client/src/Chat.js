import { useState, useEffect } from 'react'
import './App.css';

const Chat = ({socket, username, room}) => {
    const [message, setMessage] = useState('');
    const [messageRecieved, setMessageRecieved] = useState([]);


  const sendMessage = async () =>{
    if (message !== ''){
      const messageData = {
        room: room,
        author: username,
        message: message,
        time: new Date (Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_message", messageData);
      setMessageRecieved((list) => [...list, messageData]);

    }

  }

//   useEffect to ensure that the messages are update everytime a new message is sent e.g. when there is a change in the socket server
useEffect(()=>{
    const receiveMessageHandler = (data) => {
        setMessageRecieved((list) => [...list, data]);
    };

    socket.on('receive_message', receiveMessageHandler);

    return () => {
        // Clean up the event listener when the component unmounts to messages to stop showing twice
        socket.off('receive_message', receiveMessageHandler);
    };
}, [socket])

  return (
    <div className='chatContainer'>
        <div className='chatHeader'>
          <h1>You are in room {room}</h1>
        </div>
        <div className='chatBody'>
          <div className='messageContainer'>
            <div className='chatMessage'>
                {messageRecieved.map((message)=>{
                    return(
                        <div
                className="message"
                id={username === message.author ? "you" : "other"}
              >
                <div className='messageText'>
                  <h4>{message.message}</h4>
                </div>
                <div className='messageInfo'> 
                  <p>{message.time}</p>
                  <p>{message.author}</p>
                </div>
              </div>
                       
                    
                    )
                })
                }
            </div>
            </div>
            <div className='writeMessageContainer'>
                <input type='text' placeholder='Write you message here....' onChange={(e)=> setMessage(e.target.value)}/>
                <button onClick={sendMessage}> Send </button>
            </div>
        </div>
        
    </div>
  )
}

export default Chat

