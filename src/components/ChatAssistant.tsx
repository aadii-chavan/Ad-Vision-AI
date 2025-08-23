import React, { useMemo, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { sendMarketingChat } from '@/lib/chat';

interface ChatAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface UserContext {
  businessType?: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  goals?: string[];
  currentChallenges?: string[];
}

const initialSystemPrompt = `You are AdVision AI, a professional Marketing, Advertising, and Campaign Product Manager expert. You specialize in:

**Core Expertise:**
- Digital marketing strategy and campaign planning
- Social media advertising (Meta, Google, TikTok, LinkedIn)
- Performance marketing and ROI optimization
- Brand strategy and positioning
- Marketing analytics and data-driven insights
- Creative campaign development
- Customer acquisition and retention strategies
- Marketing automation and funnel optimization

**Your Communication Style:**
- Professional yet approachable
- Data-driven with practical insights
- Ask clarifying questions to understand context
- Provide actionable recommendations
- Use industry terminology appropriately
- Share relevant examples and case studies when helpful

**Conversation Flow:**
- Greet users warmly and introduce yourself as AdVision AI
- Ask about their business, industry, or specific marketing challenges
- Gather relevant context (budget, timeline, goals, current performance)
- Provide tailored, actionable advice
- Ask follow-up questions to dive deeper
- Offer next steps or additional resources when appropriate

**Response Guidelines:**
- Keep responses concise but comprehensive
- Focus ONLY on marketing, advertising, and campaign management topics
- If asked about non-marketing topics, politely redirect to marketing-related subjects
- Use bullet points and structured responses for complex topics
- Include specific metrics, benchmarks, or industry standards when relevant
- Always maintain a helpful, professional tone

**Context Management:**
- Remember user's business type, industry, budget, and goals
- Reference previous conversation context when appropriate
- Build on previous recommendations and insights
- Ask follow-up questions based on what you've learned about their situation

Remember: You are a marketing expert assistant. Stay focused on helping users with their marketing, advertising, and campaign needs.`;

const ChatAssistant: React.FC<ChatAssistantProps> = ({ open, onOpenChange }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'sys', role: 'system', content: initialSystemPrompt },
  ]);
  const [userContext, setUserContext] = useState<UserContext>({});
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const visibleMessages = useMemo(() => messages.filter(m => m.role !== 'system'), [messages]);

  // Function to extract user context from messages
  const extractUserContext = (userMessage: string): Partial<UserContext> => {
    const context: Partial<UserContext> = {};
    
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
    if (!trimmed || isSending) return;
    
    const user: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: trimmed };
    setMessages(prev => [...prev, user]);
    
    // Extract and update user context
    const newContext = extractUserContext(trimmed);
    setUserContext(prev => ({ ...prev, ...newContext }));
    
    setInput('');
    setIsSending(true);
    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const response = await sendMarketingChat([...messages, user].map(m => ({ role: m.role, content: m.content })));
      const assistant: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: response };
      setMessages(prev => [...prev, assistant]);
      // Scroll to bottom after adding response
      requestAnimationFrame(() => {
        viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
      });
    } catch (err) {
      const assistant: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: 'Sorry, I could not process that request right now.' };
      setMessages(prev => [...prev, assistant]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>AdVision AI - Marketing Expert</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[60vh]">
          <ScrollArea className="flex-1 border rounded-md p-3" viewportRef={viewportRef}>
            <div className="space-y-3">
              {visibleMessages.length === 0 && (
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">Hello! I'm AdVision AI, your Marketing, Advertising & Campaign Product Manager expert. Ask me about strategy, campaigns, analytics, or any marketing challenge! 👋</div>
                  <div className="text-xs text-muted-foreground">
                    <div className="font-medium mb-2">Quick start suggestions:</div>
                    <div className="space-y-1">
                      <div>• "I run an ecommerce store and want to improve my Facebook ad performance"</div>
                      <div>• "Help me create a marketing strategy for my SaaS startup"</div>
                      <div>• "What's the best way to optimize my Google Ads campaigns?"</div>
                      <div>• "How can I improve my conversion rate and ROI?"</div>
                    </div>
                  </div>
                </div>
              )}
              {visibleMessages.map((m) => (
                <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    'max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap',
                    m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-3 flex gap-2">
            <Input
              placeholder="Ask about marketing strategy, campaigns, analytics..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
            />
            <Button onClick={handleSend} disabled={isSending || !input.trim()}>Send</Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {import.meta.env.VITE_OPENAI_API_KEY ? 'Powered by your OpenAI key' : 'No API key detected; responses are locally generated examples.'}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatAssistant;


