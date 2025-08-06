import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

// Connect to backend server
const socket = io.connect(import.meta.env.VITE_BACKEND_URL||"http://localhost:4000");

const App = () => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  // Send a message to server
  const sendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      text: message,
      fromSelf: true
    };

    socket.emit("send-message", message);
    setAllMessages(prev => [...prev, messageData]);
    setMessage("");
  };

  // Listen for messages from server
  useEffect(() => {
    socket.on("receive-message", (data) => {
      const messageData = {
        text: data,
        fromSelf: false
      };
      setAllMessages(prev => [...prev, messageData]);
    });

    // Cleanup function to remove the listener when component unmounts
    return () => {
      socket.off("receive-message");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      {/* Header */}
      <div className="mb-1 text-center">
        <h1 className="text-[3rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
          chatterbox
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-4 flex flex-col h-[80vh]">

        {/* Message display box */}
        <div className="flex-1 overflow-y-auto border p-2 rounded mb-4 flex flex-col">
          {allMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.fromSelf ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`p-2 rounded-lg max-w-[70%] ${
                  message.fromSelf
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input and button */}
        <div className="flex gap-2">
          <input
            className="flex-1 border p-2 rounded-lg"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;