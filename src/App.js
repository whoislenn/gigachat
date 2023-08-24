import React, { useState, useEffect } from 'react';
import "./App.css"

import firebase from 'firebase/compat/app';

import 'firebase/compat/database';


function ChatroomApp() {

  const firebaseConfig = {
    apiKey: "AIzaSyCysgNS_5rz-loOMMP9ZgkARXoWKsPCO5k",
    authDomain: "gigachat-67f7b.firebaseapp.com",
    projectId: "gigachat-67f7b",
    storageBucket: "gigachat-67f7b.appspot.com",
    messagingSenderId: "619901791885",
    appId: "1:619901791885:web:bbe2c113545bcfe0e1bcc4",
    measurementId: "G-MXBZL1080V"
  };
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = database.ref('messages');
    messagesRef.on('child_added', (snapshot) => {
      const newMessage = snapshot.val();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      messagesRef.off('child_added');
    };
  }, []);
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };


  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        text: messageInput,
        sender: 'you',
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      };
  
      database.ref('messages').push(newMessage);
      setMessageInput('');
    }
  };

 
  return (
    <div className="chat-container">
      <div className="chat-area">

      {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-bubble ${message.sender === 'you' ? 'sent-by-you' : 'sent-by-others'}`}
          >
            {message.text}
          </div>
        ))}




      </div>
      <div className="chat-box">

      <input 
          
          type="text"
          className="message-input"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown} // Add this line to handle Enter key
          placeholder="Type your message..."
        />
        <button className="submit-button" onClick={sendMessage}>
          Send
        </button>
        
      </div>
        

    </div>


  );
}

export default ChatroomApp;
