import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/Assessment.css";

export default function StudentChatbot({ userProfile: initialProfile = {} }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `👋 Hello ${initialProfile?.name || "Student"}! I'm your AI career mentor. Tell me about your interests and I'll provide a detailed roadmap!`,
      structured_data: null
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: initialProfile?.name || "Student",
    interest: initialProfile?.interest || "general"
  });
  const chatBoxRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message
    const userMsg = { sender: "user", text: trimmedInput, structured_data: null };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Add loading state
    setMessages(prev => [...prev, {
      sender: "bot",
      text: "🤔 Analyzing your interest...",
      structured_data: null
    }]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat/api/chat/",
        {
          message: trimmedInput,
          userProfile
        },
        {
          timeout: 30000,
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.data.success) {
        // Update profile
        if (response.data.userProfile) {
          setUserProfile(response.data.userProfile);
        }

        // Replace loading message with actual response
        setMessages(prev => [
          ...prev.slice(0, -1),
          {
            sender: "bot",
            text: response.data.response,
            structured_data: response.data.structured_data || null
          }
        ]);
      } else {
        throw new Error(response.data.error || "Unknown error");
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMsg = error.response?.data?.error || error.message || "Unable to connect";
      
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          sender: "bot",
          text: `❌ ${errorMsg}`,
          structured_data: null
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <div className="chat-header">
        <div className="header-left">
          <h2>🎓 Career Roadmap Mentor</h2>
        </div>
        <div className="header-right">
          <div className="profile-badge">
            <span className="profile-label">👤</span>
            <span className="profile-value">{userProfile.name}</span>
          </div>
          {userProfile.interest !== "general" && (
            <div className="profile-badge">
              <span className="profile-label">🎯</span>
              <span className="profile-value">{userProfile.interest}</span>
            </div>
          )}
        </div>
      </div>

      {/* Chat messages */}
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.sender}`}>
            {/* Text Message */}
            <div className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
              {msg.sender === "bot" && <span className="bot-avatar">🤖</span>}
              <div className="message-content">
                {msg.text}
              </div>
              {msg.sender === "user" && <span className="user-avatar">👤</span>}
            </div>

            {/* Structured Data */}
            {msg.structured_data && (
              <StructuredResponseDisplay data={msg.structured_data} />
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="chat-input-area">
        <div className="input-wrapper">
          <textarea
            className="chat-input"
            placeholder="Ask: 'tell me about cybersecurity', 'hacking roadmap', 'ca career path'... (Enter to send)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            rows="2"
          />
          <button
            className={`btn-send ${isLoading ? "loading" : ""}`}
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "⏳" : "📤"}
          </button>
        </div>
        <div className="input-hint">
          💡 Try: "cybersecurity roadmap" or "how to become ca" or "psychology career"
        </div>
      </div>
    </div>
  );
}