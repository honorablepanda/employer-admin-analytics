import React, { useState } from "react";

const fakeResponses = {
  "show me student applications": "Currently, there are 320 student applications this month.",
  "how many active employers": "We have 45 active employers engaged right now.",
  "average time to hire": "The average time to hire is 27 days across all job posts.",
  "job post visibility": "Job post visibility dropped by 12% compared to last month.",
};

export default function AdminDataChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me about the Employer & Admin Analytics data." },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input.trim() };
    setMessages((msgs) => [...msgs, userMessage]);

    // Simulate backend response delay
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      const botReply =
        Object.keys(fakeResponses).find((key) => lowerInput.includes(key)) || null;

      const botMessage = {
        from: "bot",
        text: botReply ? fakeResponses[botReply] : "Sorry, I don't have an answer for that yet.",
      };

      setMessages((msgs) => [...msgs, botMessage]);
    }, 1000);

    setInput("");
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: "1rem",
        maxWidth: 500,
        marginTop: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3>Admin Data Chat Assistant</h3>
      <div
        style={{
          height: 200,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "0.5rem",
          borderRadius: 4,
          marginBottom: "1rem",
          backgroundColor: "#fafafa",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "0.5rem",
              textAlign: msg.from === "user" ? "right" : "left",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "0.4rem 0.8rem",
                borderRadius: 12,
                backgroundColor: msg.from === "user" ? "#007bff" : "#eee",
                color: msg.from === "user" ? "white" : "black",
                maxWidth: "80%",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Ask a question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
        style={{ width: "100%", padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
      />
      <button
        onClick={handleSend}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}
