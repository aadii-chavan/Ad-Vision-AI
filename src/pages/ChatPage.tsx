import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DashboardSidebar from '@/components/DashboardSidebar';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I\'m AdVision AI, your professional Marketing, Advertising & Campaign Product Manager expert. 👋\n\nI specialize in digital marketing strategy, social media advertising, performance marketing, and campaign optimization.\n\nTo help you most effectively, could you tell me:\n• What type of business or industry you\'re working with?\n• What specific marketing challenge or goal you\'d like to discuss?\n• Your current marketing budget and timeline?\n\nI\'m here to provide data-driven insights and actionable recommendations for your marketing success!' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: input },
      // Simulate AI response
      { sender: 'ai', text: "I'm an AI! How can I help you today?" },
    ]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      {/* Navbar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar />
      </div>
      {/* Sidebar - Fixed height with scroll */}
      <div className="fixed left-0 top-0 h-screen z-[90] pt-20">
        <div className="h-full overflow-y-auto">
          <DashboardSidebar />
        </div>
      </div>
      {/* Main Content - Chat Area */}
      <div className="flex-1 ml-64 pt-20 relative z-10 flex flex-col">
        <div className="flex-1 overflow-y-auto px-0 md:px-8 py-8" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          <div className="flex flex-col space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-lg shadow-md text-sm whitespace-pre-line break-words ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-muted-foreground rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {/* Input Box */}
        <form
          onSubmit={handleSend}
          className="w-full flex items-center gap-2 px-4 py-4 border-t border-border bg-background sticky bottom-0 z-20"
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
