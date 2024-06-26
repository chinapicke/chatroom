


import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  

  return (
    <div className="App">
                {
            !showChat ?
            <div className="joinChatContainer">

            <h2 className="mainPageTitle">Join A Chat</h2>
            <div className="joinChatInputSection">
            <input
            className="nameInput"
              type="text"
              placeholder="Input your name"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            </div>
            <button onClick={joinRoom}>Join A Room</button>
          </div>
          :
          <Chat socket={socket} username={username} room={room} />
          }
    </div>
  );
}

export default App;