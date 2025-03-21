"use client";

import { useState, ChangeEvent } from "react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  // Handler for sending a message to the backend API
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add the user's message to the chat history
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Add the AI's response to the chat history
      const aiMessage: Message = { sender: "ai", text: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = { sender: "ai", text: "Sorry, something went wrong." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    // Clear the input field
    setInput("");
  };

  return (
    <div className = "container, bg-blue-50">
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#f4f6f8",
        color: "#333",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#0070f3" }}>AI Code Editor Chat</h1>
      {/* Chat window */}
      <div
        style={{
          border: "2px solid #0070f3",
          borderRadius: "8px",
          padding: "1rem",
          height: "400px",
          overflowY: "auto",
          marginBottom: "1rem",
          backgroundColor: "#ffffff",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "ai" ? "left" : "right",
              margin: "0.5rem 0",
              padding: "0.5rem",
              borderRadius: "8px",
              backgroundColor: msg.sender === "ai" ? "#e3e8ef" : "#cce5ff",
              display: "inline-block",
              maxWidth: "80%",
            }}
          >
            <strong style={{ color: "#0056b3" }}>{msg.sender === "ai" ? "AI" : "You"}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <textarea
          rows={4}
          value={input}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
          placeholder="Ask a coding question or type your code..."
          style={{
            padding: "0.75rem",
            fontSize: "1rem",
            marginBottom: "0.75rem",
            borderRadius: "8px",
            border: "2px solid #0070f3",
            backgroundColor: "#ffffff",
            color: "#333",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "0.75rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            transition: "0.3s ease-in-out",
          }}
        >
          Send
        </button>
      </div>
    </div>
    </div>
  );
}