import React, { useState } from "react";
import "../assets/css/blogchat.css";

const Blog = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      name: "Alice",
      message: "This blog is insightful!",
      timestamp: "2 mins ago",
    },
    {
      id: 2,
      name: "Bob",
      message: "I love the new updates!",
      timestamp: "1 min ago",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const newEntry = {
      id: entries.length + 1,
      name: "You",
      message: input,
      timestamp: "Just now",
    };
    setEntries([newEntry, ...entries]);
    setInput("");
  };

  return (
    <>
      <br />
      <div className="chat-container">
        <header className="chat-header">📝 Blog Chat</header>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add your thoughts..."
            className="chat-input"
          />
          <button type="submit" className="chat-submit">
            ➤
          </button>
        </form>

        <section className="chat-entries">
          {entries.map((entry) => (
            <div className="chat-entry" key={entry.id}>
              <span className="chat-name">{entry.name}</span>
              <span className="chat-message">{entry.message}</span>
              <span className="chat-timestamp">{entry.timestamp}</span>
            </div>
          ))}
        </section>

        <footer className="chat-footer">
          <input
            type="text"
            placeholder="Type a reply..."
            className="footer-input"
          />
        </footer>
      </div>
      <br />
      <br />
    </>
  );
};

export default Blog;
