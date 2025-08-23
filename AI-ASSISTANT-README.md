# AI Assistant Integration Guide

This application integrates a React frontend with a Python-based AI backend using a Flask API. The chatbot has been fine-tuned to be a professional Marketing, Advertising, and Campaign Product Manager expert.

## Enhanced Features

### Professional Marketing Expert Persona
- **AdVision AI**: Specialized in digital marketing strategy, social media advertising, performance marketing, and campaign optimization
- **Core Expertise**: Covers all aspects of modern marketing including Meta, Google, TikTok, LinkedIn advertising
- **Professional Communication**: Data-driven insights with actionable recommendations

### Advanced Conversation Management
- **Context Awareness**: Remembers user's business type, industry, budget, and goals
- **Conversation History**: Maintains context across multiple interactions
- **Follow-up Questions**: Asks relevant questions to gather more context
- **Personalized Responses**: Tailors advice based on user's specific situation

### Smart Context Extraction
- **Business Type Detection**: Automatically identifies ecommerce, SaaS, B2B, B2C, etc.
- **Budget Recognition**: Extracts budget information from user messages
- **Timeline Understanding**: Recognizes urgency and timeline requirements
- **Goal Identification**: Identifies marketing objectives (awareness, conversions, leads, etc.)

## Setup & Running the Application

### Frontend (React)

1. Install dependencies:
   ```
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

2. Start the development server:
   ```
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

### Backend (Python Flask)

1. Make the startup script executable:
   ```
   chmod +x start-backend.sh
   ```

2. Run the backend server:
   ```
   ./start-backend.sh
   ```

   This script will:
   - Create a Python virtual environment
   - Install required packages
   - Start the Flask server

## Architecture

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Python Flask API with Gemini AI integration
- **AI Model**: Google Gemini 1.5 Flash optimized for marketing queries
- **Context Management**: Advanced conversation and user context tracking

## API Endpoints

- **GET `/api/health`** - Check if API and model are available
- **POST `/api/chat`** - Send a question and get an AI response with context
  - Request body: `{ "question": "Your marketing question", "conversation_history": [...], "user_context": {...} }`
  - Response: `{ "answer": "AI generated answer" }`

## Conversation Examples

### Initial Greeting
The chatbot greets users warmly and asks for context:
```
Hello! I'm AdVision AI, your professional Marketing, Advertising & Campaign Product Manager expert. 👋

I specialize in digital marketing strategy, social media advertising, performance marketing, and campaign optimization.

To help you most effectively, could you tell me:
• What type of business or industry you're working with?
• What specific marketing challenge or goal you'd like to discuss?
• Your current marketing budget and timeline?

I'm here to provide data-driven insights and actionable recommendations for your marketing success!
```

### Context-Aware Responses
The chatbot remembers user context and provides personalized advice:
```
Based on your ecommerce business with a $5k budget, here are my recommendations for improving your Facebook ad performance...

[Previous conversation context is referenced]
Since you mentioned wanting to focus on conversions, let's dive deeper into your conversion funnel...
```

## Development Notes

- The frontend expects the backend to be running on http://localhost:5000
- Context is automatically extracted from user messages
- Conversation history is maintained for better continuity
- The chatbot stays focused on marketing topics and redirects off-topic questions

## Production Deployment

For production:

1. Build the frontend:
   ```
   npm run build
   ```

2. Set up proper hosting for both frontend and backend
3. Configure environment variables for API URL and Gemini API key
4. Consider using smaller or quantized models for better performance
5. Implement proper authentication and rate limiting
