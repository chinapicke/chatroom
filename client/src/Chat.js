import { useState, useEffect } from 'react'

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

        </div>
        <div className='chatBody'>
            <div className='chatMessage'>
                {messageRecieved.map((message)=>{
                    return(
                        <div
                className="message"
                id={username === message.author ? "you" : "other"}
              >
                 <h1>{message.message}</h1>
                        <p>{message.time}</p>
                        <p>{message.author}</p>
              </div>
                       
                    
                    )
                })
                }
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

