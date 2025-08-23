import React from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

const MarkdownTest: React.FC = () => {
  const testContent = `# Welcome to AdVision AI! 🚀

I'm your **professional Marketing, Advertising, and Campaign Product Manager expert**.

## What I can help you with:

**Core Expertise:**
- Digital marketing strategy and campaign planning
- Social media advertising (Meta, Google, TikTok, LinkedIn)
- Performance marketing and ROI optimization
- Brand strategy and positioning

### Key Metrics to Track:
- **CTR** (Click-Through Rate): Industry avg 1-3%
- **CPC** (Cost Per Click): Varies by industry
- **Conversion Rate**: 2-5% for most industries
- **ROAS** (Return on Ad Spend): Target 3:1 or higher

> *"Marketing is not about having the right answers. It's about asking the right questions."*

Here's some \`inline code\` and a code block:

\`\`\`javascript
const marketingStrategy = {
  targetAudience: "defined",
  kpis: "clear",
  budget: "$5000",
  timeline: "Q1 2024"
};
\`\`\`

**Special Symbols Test:**
- ✅ Checkmarks work
- ❌ X marks work  
- 🔥 Fire emoji
- 💰 Money emoji
- 📈 Chart emoji
- 🎯 Target emoji

*This is italic text for emphasis*

**This is bold text for important points**

Would you like me to help you with your marketing strategy?`;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Markdown Rendering Test</h1>
        
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Raw Markdown:</h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            {testContent}
          </pre>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Rendered Markdown:</h2>
          <div className="bg-muted p-4 rounded-lg">
            <MarkdownRenderer content={testContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownTest;
