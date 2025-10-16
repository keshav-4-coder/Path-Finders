import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Assessment.css";

export default function StudentChatbot() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("AuthContext user:", user);
  }, [user]);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello ${user?.name || "User"}! I'm your AI career mentor. Tell me about your interests!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: user?.name || "User",
    interest: user?.interests || "general",
  });
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setUserProfile({
      name: user?.name || "User",
      interest: user?.interests || "general",
    });
  }, [user]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmedInput }]);
    setInput("");

    setMessages((prev) => [...prev, { sender: "bot", text: "Thinking..." }]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat/api/chat/",
        { message: trimmedInput, userProfile },
        { timeout: 30000, headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        console.log("API userProfile response:", response.data.userProfile);
        if (response.data.userProfile) {
          setUserProfile(response.data.userProfile);
        }

        setMessages((prev) => [
          ...prev.slice(0, -1),
          { sender: "bot", text: response.data.response },
        ]);
      } else {
        throw new Error(response.data.error || "Unknown error");
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMsg = error.response?.data?.error || error.message || "Unable to connect";
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: `Error: ${errorMsg}` },
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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>AI Mentor</h2>
        <div className="user-info">
          <div className="user-avatar">{getInitials(userProfile.name)}</div>
          <span>{userProfile.name} ({userProfile.interest})</span>
        </div>
      </div>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.sender}`}>
            <div className={`chat-message ${msg.sender}-message`}>
              <div className="message-content">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <div className="input-wrapper">
          <textarea
            className="chat-input"
            placeholder="Ask about career paths or interests..."
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
            {isLoading ? "..." : "➤"}
          </button>
        </div>
      </div>
    </div>
  );
}