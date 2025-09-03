import { useEffect, useRef, useState } from "react";
import { Bot, Send, Paperclip } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [userContext, setUserContext] = useState<{[key: string]: any}>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Function to extract user context from messages
  const extractUserContext = (userMessage: string): {[key: string]: any} => {
    const context: {[key: string]: any} = {};
    
    // Extract business type/industry
    const businessKeywords = ['ecommerce', 'saas', 'b2b', 'b2c', 'startup', 'agency', 'consulting', 'retail', 'healthcare', 'finance', 'education', 'real estate'];
    const foundBusiness = businessKeywords.find(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );
    if (foundBusiness) context.businessType = foundBusiness;

    // Extract budget information
    const budgetPatterns = [/\$(\d+[k]?)/i, /(\d+[k]?\s*dollars?)/i, /budget.*?(\d+[k]?)/i];
    for (const pattern of budgetPatterns) {
      const match = userMessage.match(pattern);
      if (match) {
        context.budget = match[1];
        break;
      }
    }

    // Extract timeline
    const timelineKeywords = ['immediately', 'asap', 'next week', 'next month', 'quarter', 'year'];
    const foundTimeline = timelineKeywords.find(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );
    if (foundTimeline) context.timeline = foundTimeline;

    // Extract goals
    const goalKeywords = ['awareness', 'conversions', 'leads', 'sales', 'traffic', 'engagement', 'brand', 'roi'];
    const foundGoals = goalKeywords.filter(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );
    if (foundGoals.length > 0) context.goals = foundGoals;

    return context;
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    
    const userText = trimmed.replace(/\s+/g, " ");
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    
    // Extract and update user context
    const newContext = extractUserContext(userText);
    setUserContext(prev => ({ ...prev, ...newContext }));
    
    setInput("");
    setIsLoading(true);
    
    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          question: userText,
          conversation_history: conversationHistory,
          user_context: { ...userContext, ...newContext }
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, { sender: "ai", text: data.answer }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        sender: "ai", 
        text: "Sorry, I'm having trouble connecting to the server. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>

      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar />
      </div>

      <div className="fixed left-0 top-0 h-screen z-[90] pt-20">
        <div className="h-full overflow-y-auto">
          <DashboardSidebar />
        </div>
      </div>

      <div className="flex-1 ml-64 pt-20 relative z-10">
        <div className="h-full overflow-y-auto">
          <main className="p-6">
            <div className="max-w-5xl mx-auto">
              {/* Empty state */}
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center py-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-[#0f172a]">
                      <Bot className="h-6 w-6 text-[#60a5fa]" />
                    </div>
                    <h1 className="text-3xl font-semibold">AdVision AI - Marketing Expert</h1>
                  </div>
                  <div className="w-full max-w-3xl rounded-2xl bg-[#111111] border border-border/30 shadow-sm px-3 sm:px-4 py-2 flex items-center gap-2">
                    <button className="p-2 rounded-xl hover:bg-[#1a1a1a] text-gray-300" title="Attach file">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <textarea
                      className="flex-1 bg-transparent text-white placeholder:text-gray-500 resize-none px-1 py-2 focus:outline-none min-h-[52px]"
                      placeholder="Ask about marketing strategy, campaigns, analytics, or any marketing challenge..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                      rows={1}
                    />
                    <button
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium p-3 rounded-xl transition-colors disabled:opacity-50 h-[44px] w-[44px] flex items-center justify-center"
                      onClick={handleSend}
                      disabled={!input.trim()}
                      title="Send message"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Conversation */}
              {(messages.length > 0 || isLoading) && (
                <div className="flex flex-col">
                  <div className="flex-1 w-full max-w-3xl mx-auto px-1">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex mb-6 ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                        {m.sender === "user" ? (
                          <div className="flex flex-col items-end">
                            <div className="text-xs text-gray-500 mb-1 mr-2">You</div>
                            <div className="inline-block max-w-[92%] sm:max-w-[85%] md:max-w-[75%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-md text-base text-white rounded-br-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8]">
                              {m.text}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-start">
                            <div className="text-xs text-gray-500 mb-1 ml-2">AI Assistant</div>
                            <div className="inline-block max-w-[92%] sm:max-w-[85%] md:max-w-[75%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-md text-base bg-[#1b1b1b] text-[#e5e7eb] rounded-bl-xl border border-border/20">
                              {m.text}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start mb-6">
                        <div className="max-w-[92%] sm:max-w-[85%] md:max-w-[75%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-md bg-[#1b1b1b] text-[#e5e7eb] rounded-bl-xl border border-border/20">
                          <span className="text-sm text-gray-400">Thinking…</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Composer fixed at bottom of conversation */}
                  <div className="px-3 sm:px-6 py-4 sticky bottom-0 bg-gradient-to-t from-background via-background/90 to-background/60 backdrop-blur">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-center gap-2 rounded-2xl bg-[#111111] border border-border/30 px-2 sm:px-3 py-2">
                        <button className="p-2 rounded-xl hover:bg-[#1a1a1a] text-gray-300" title="Attach file">
                          <Paperclip className="h-5 w-5" />
                        </button>
                        <textarea
                          className="flex-1 bg-transparent text-white placeholder:text-gray-500 resize-none px-1 py-2 focus:outline-none min-h-[52px] max-h-36"
                          placeholder="How can the assistant help?"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={onKeyDown}
                          onCompositionStart={() => setIsComposing(true)}
                          onCompositionEnd={() => setIsComposing(false)}
                          rows={1}
                        />
                        <button
                          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium p-3 rounded-xl transition-colors disabled:opacity-50 h-[44px] w-[44px] flex items-center justify-center"
                          onClick={handleSend}
                          disabled={!input.trim() || isLoading}
                          title="Send message"
                        >
                          <Send className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Chat;
