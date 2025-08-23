import { z } from 'zod';

type Role = 'system' | 'user' | 'assistant';

interface Message {
  role: Role;
  content: string;
}

const openAiResponseSchema = z.object({
  choices: z.array(z.object({
    message: z.object({
      content: z.string()
    })
  }))
});

export async function sendMarketingChat(messages: Message[]): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
  const baseUrl = (import.meta.env.VITE_OPENAI_BASE_URL as string | undefined) || 'https://api.openai.com/v1';
  const model = (import.meta.env.VITE_OPENAI_MODEL as string | undefined) || 'gpt-3.5-turbo';

  // If no API key, return a stubbed response
  if (!apiKey) {
    const lastUser = messages.slice().reverse().find(m => m.role === 'user');
    const question = lastUser?.content || '';
    
    // Check if this is the first message (greeting)
    if (messages.length <= 2) {
      return `Hello! I'm AdVision AI, your professional Marketing, Advertising, and Campaign Product Manager expert. 👋

I specialize in digital marketing strategy, social media advertising, performance marketing, and campaign optimization. 

To help you most effectively, could you tell me:
• What type of business or industry you're working with?
• What specific marketing challenge or goal you'd like to discuss?
• Your current marketing budget and timeline?

I'm here to provide data-driven insights and actionable recommendations for your marketing success!`;
    }
    
    // Provide marketing-focused response based on the question
    const marketingKeywords = ['campaign', 'advertising', 'marketing', 'ads', 'social media', 'roi', 'conversion', 'lead', 'brand', 'strategy', 'analytics', 'performance'];
    const hasMarketingContext = marketingKeywords.some(keyword => 
      question.toLowerCase().includes(keyword)
    );
    
    if (hasMarketingContext) {
      return `Here are some professional marketing insights for: "${question}"

**Strategic Recommendations:**
• Define your target audience with specific demographics and psychographics
• Set clear KPIs and measurement frameworks
• Test multiple creative variations and messaging approaches
• Optimize for both awareness and conversion objectives

**Actionable Next Steps:**
1. Conduct audience research and competitive analysis
2. Develop a multi-channel campaign strategy
3. Create compelling ad creatives with strong CTAs
4. Implement tracking and analytics setup
5. Launch with A/B testing framework

**Key Metrics to Track:**
- CTR (Click-Through Rate): Industry avg 1-3%
- CPC (Cost Per Click): Varies by industry
- Conversion Rate: 2-5% for most industries
- ROAS (Return on Ad Spend): Target 3:1 or higher

Would you like me to dive deeper into any specific aspect of your marketing strategy?`;
    } else {
      return `I'm AdVision AI, your Marketing, Advertising, and Campaign Product Manager expert! 

I specialize in helping businesses with:
• Digital marketing strategy and campaign planning
• Social media advertising optimization
• Performance marketing and ROI improvement
• Brand strategy and positioning
• Marketing analytics and data insights

Could you share more about your marketing goals or challenges? I'd love to help you develop effective strategies and campaigns!`;
    }
  }

  const body = {
    model,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
    temperature: 0.7,
    top_p: 0.9
  };

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error('Chat request failed');
  }

  const data = await res.json();
  const parsed = openAiResponseSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Unexpected response shape');
  }
  return parsed.data.choices[0]?.message?.content?.trim() || '';
}


