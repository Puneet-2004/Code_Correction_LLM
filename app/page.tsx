"use client";

import { useState, ChangeEvent } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  // Handler for sending a message to the backend API
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add the user's message to the chat history
    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('./api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Add the AI's response to the chat history
      const aiMessage: Message = { sender: 'ai', text: data.answer };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = { sender: 'ai', text: 'Sorry, something went wrong.' };
      setMessages(prev => [...prev, errorMessage]);
    }

    // Clear the input field
    setInput('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>AI Code Editor Chat</h1>
      {/* Chat window */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '1rem',
          height: '400px',
          overflowY: 'scroll',
          marginBottom: '1rem',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'ai' ? 'left' : 'right',
              margin: '0.5rem 0',
            }}
          >
            <strong>{msg.sender === 'ai' ? 'AI' : 'You'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <textarea
          rows={4}
          value={input}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
          placeholder="Ask a coding question or type your code..."
          style={{ padding: '0.5rem', fontSize: '1rem', marginBottom: '0.5rem' }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            cursor: 'pointer',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
