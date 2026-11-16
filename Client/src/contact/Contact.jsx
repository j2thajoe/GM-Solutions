import React, { useState, useEffect } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import "../assets/css/contact.css";
import socket from "../socket";
import Blog from "../blog/Blog";

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  // Send message when the user submits the form
  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("send-message", newMessage);
      setMessages((prevMessages) => [...prevMessages, `You: ${newMessage}`]);
      setNewMessage("");
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <div className="contact-info">
        {/* Phone Numbers Section */}
        <div className="contact-item">
          <PhoneIcon size={30} />
          <p>+254 795 086 284</p>
        </div>
        <div className="contact-item">
          <PhoneIcon size={30} />
          <p>+254 724 225 552</p>
        </div>

        {/* Email Section */}
        <div className="contact-item">
          <EmailIcon size={30} />
          <p>gmbusinessservices@gmail.com</p>
        </div>

        {/* Whatsapp Section */}
        <div className="contact-item">
          <a href="https://wa.me/254795086284" target="_blank" rel="noreferrer">
            <EmailIcon size={30} />
            <p>Chat with us on WhatsApp</p>
          </a>
        </div>
      </div>

      {/* Chat Widget Section */}
      <div className="chat-widget">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
