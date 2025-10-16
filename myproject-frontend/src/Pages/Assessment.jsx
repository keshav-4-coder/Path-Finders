import { useState } from "react";
import "../styles/Assessment.css";

export default function Assessment({ userProfile }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `👋 Hello ${userProfile?.name || "Student"}! I’m your AI mentor. What would you like to learn today?`
    }
  ]);
  const [input, setInput] = useState("");

  // Simulated AI response logic
  const getAIResponse = (message) => {
    const text = message.toLowerCase();

    if (text.includes("web")) {
      return `🌐 Since you like ${userProfile?.interests || "Web Development"}, I recommend starting with HTML, CSS, and JavaScript. Then try React for advanced frontend.`;
    } else if (text.includes("ai")) {
      return `🤖 AI is exciting! Learn Python, Data Science basics, then move on to Machine Learning and Deep Learning.`;
    } else if (text.includes("dsa")) {
      return `📘 DSA is key for problem-solving. Start with arrays, stacks, and linked lists, then explore trees and graphs.`;
    } else if (text.includes("course")) {
      return `📚 Based on your profile, your current course is "${userProfile?.course || "N/A"}". Keep progressing!`;
    }

    return "✨ Interesting! Tell me more about your interests or what you want to achieve so I can guide you.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: getAIResponse(input) };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="assessment-container">
      <div className="chat-header">
        <h2>AI Chat</h2>
        <span className="user-info">{userProfile?.name || "Student"}</span>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me about your learning path..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn-send" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
