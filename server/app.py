from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os
from dotenv import load_dotenv
import logging
import requests
import json
import re
import random
from mock_ads_data import filter_ads, get_business_types, get_categories, get_countries

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins='*', supports_credentials=False)

# Get Gemini API key from environment
GEMINI_API_KEY = os.getenv('GEMINI_APIKEY')
if not GEMINI_API_KEY:
    logger.warning("GEMINI_APIKEY not found in environment variables")

def generate_gemini_response(user_query):
    """Generate response using Google's Gemini API"""
    if not GEMINI_API_KEY:
        return "Gemini API key not configured. Please check server logs and ensure GEMINI_APIKEY is set in the .env file."
    
    try:
        # Use gemini-1.5-flash which is available in the current API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        headers = {
            "Content-Type": "application/json",
        }
        
        # Professional marketing expert system prompt
        system_prompt = """You are AdVision AI, a professional Marketing, Advertising, and Campaign Product Manager expert. You specialize in:

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

Remember: You are a marketing expert assistant. Stay focused on helping users with their marketing, advertising, and campaign needs."""

        # Combine system prompt with user query
        full_prompt = f"{system_prompt}\n\nUser: {user_query}\n\nAdVision AI:"
        
        data = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": full_prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "topP": 0.9,
                "topK": 40,
                "maxOutputTokens": 1000
            }
        }
        
        response = requests.post(url, headers=headers, json=data)
        
        if response.status_code == 200:
            result = response.json()
            if 'candidates' in result and len(result['candidates']) > 0:
                content = result['candidates'][0]['content']
                if 'parts' in content and len(content['parts']) > 0:
                    return content['parts'][0]['text']
                else:
                    return "I received a response but couldn't extract the text."
            else:
                return "I received a response but it was empty."
        else:
            logger.error(f"Gemini API error: {response.status_code} - {response.text}")
            return f"Sorry, I encountered an error with the Gemini API: {response.status_code} - {response.text}"
            
    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}")
        return f"Sorry, I encountered an error: {str(e)}"

def generate_gemini_response_with_context(user_query, context_info="", conversation_history=""):
    """Generate context-aware response using Google's Gemini API"""
    if not GEMINI_API_KEY:
        return "Gemini API key not configured. Please check server logs and ensure GEMINI_APIKEY is set in the .env file."
    
    try:
        # Use gemini-1.5-flash which is available in the current API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        headers = {
            "Content-Type": "application/json",
        }
        
        # Professional marketing expert system prompt
        system_prompt = """You are AdVision AI, a professional Marketing, Advertising, and Campaign Product Manager expert. You specialize in:

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

Remember: You are a marketing expert assistant. Stay focused on helping users with their marketing, advertising, and campaign needs."""

        # Combine system prompt with context and user query
        full_prompt = f"{system_prompt}{context_info}{conversation_history}\n\nUser: {user_query}\n\nAdVision AI:"
        
        data = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": full_prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "topP": 0.9,
                "topK": 40,
                "maxOutputTokens": 1000
            }
        }
        
        response = requests.post(url, headers=headers, json=data)
        
        if response.status_code == 200:
            result = response.json()
            if 'candidates' in result and len(result['candidates']) > 0:
                content = result['candidates'][0]['content']
                if 'parts' in content and len(content['parts']) > 0:
                    return content['parts'][0]['text']
                else:
                    return "I received a response but couldn't extract the text."
            else:
                return "I received a response but it was empty."
        else:
            logger.error(f"Gemini API error: {response.status_code} - {response.text}")
            return f"Sorry, I encountered an error with the Gemini API: {response.status_code} - {response.text}"
            
    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}")
        return f"Sorry, I encountered an error: {str(e)}"

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok" if GEMINI_API_KEY else "error",
        "model": "gemini-1.5-flash" if GEMINI_API_KEY else "not configured",
        "api_key_configured": bool(GEMINI_API_KEY),
        "message": "Gemini API configured successfully!" if GEMINI_API_KEY else "Gemini API key not found. Check logs and ensure GEMINI_APIKEY is set."
    }), 200 if GEMINI_API_KEY else 503

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        if not data or 'question' not in data:
            return jsonify({"error": "Missing question parameter"}), 400
        
        question = data['question']
        conversation_history = data.get('conversation_history', [])
        user_context = data.get('user_context', {})
        
        logger.info(f"Received question: {question}")
        logger.info(f"User context: {user_context}")
        
        if not GEMINI_API_KEY:
            return jsonify({
                "answer": "Gemini API key is not configured. Please check server logs and ensure GEMINI_APIKEY is set in the .env file."
            })
        
        # Build context-aware prompt
        context_info = ""
        if user_context:
            context_parts = []
            if user_context.get('businessType'):
                context_parts.append(f"Business Type: {user_context['businessType']}")
            if user_context.get('industry'):
                context_parts.append(f"Industry: {user_context['industry']}")
            if user_context.get('budget'):
                context_parts.append(f"Budget: {user_context['budget']}")
            if user_context.get('timeline'):
                context_parts.append(f"Timeline: {user_context['timeline']}")
            if user_context.get('goals'):
                context_parts.append(f"Goals: {', '.join(user_context['goals'])}")
            
            if context_parts:
                context_info = f"\n\n**User Context:**\n" + "\n".join(f"- {part}" for part in context_parts)
        
        # Build conversation history
        conversation_text = ""
        if conversation_history:
            conversation_text = "\n\n**Previous Conversation:**\n"
            for msg in conversation_history[-6:]:  # Last 6 messages for context
                role = "User" if msg.get('role') == 'user' else "AdVision AI"
                conversation_text += f"{role}: {msg.get('content', '')}\n"
        
        answer = generate_gemini_response_with_context(question, context_info, conversation_text)
        
        return jsonify({
            "answer": answer
        })
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/fetch-ads', methods=['GET'])
def fetch_ads():
    # Get query params
    q = request.args.get('q', '')
    country = request.args.get('country', '').split(',') if request.args.get('country') else []
    impressions_min = int(request.args.get('impressions_min', 0))
    impressions_max = int(request.args.get('impressions_max', 1000000))
    spend_min = int(request.args.get('spend_min', 0))
    spend_max = int(request.args.get('spend_max', 100000))
    limit = int(request.args.get('limit', 12))
    offset = int(request.args.get('offset', 0))

    # Use mock data instead of Meta API
    try:
        ads = filter_ads(
            search_query=q,
            countries=country if country else None,
            min_spend=spend_min,
            max_spend=spend_max,
            min_impressions=impressions_min,
            max_impressions=impressions_max,
            limit=limit,
            offset=offset
        )
        
        logger.info(f"Returning {len(ads)} mock ads for query: {q}")
        return jsonify(ads)
        
    except Exception as e:
        logger.error(f"Exception in fetch_ads: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/filter-options', methods=['GET'])
def get_filter_options():
    """Get available filter options for the frontend"""
    try:
        return jsonify({
            'business_types': get_business_types(),
            'categories': get_categories(),
            'countries': get_countries()
        })
    except Exception as e:
        logger.error(f"Exception in get_filter_options: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "Test endpoint working"})

@app.route('/api/analyze-ads', methods=['POST', 'OPTIONS'])
def analyze_ads():
    """Analyze selected ads using AI"""
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    
    # Handle actual POST request
    try:
        data = request.json
        if not data or 'ads' not in data:
            return jsonify({"error": "Missing ads parameter"}), 400
        
        ads = data['ads']
        if not ads or len(ads) == 0:
            return jsonify({"error": "No ads provided for analysis"}), 400
        
        logger.info(f"Analyzing {len(ads)} ads")
        
        if not GEMINI_API_KEY:
            return jsonify({"error": "Gemini API key not configured"}), 503
        
        # Create analysis prompt for each ad
        analysis_results = []
        
        for i, ad in enumerate(ads):
            analysis_prompt = f"""
            Analyze this advertising creative and provide detailed insights in JSON format:

            Ad Creative: "{ad.get('ad_creative_body', '')}"
            Business Type: {ad.get('business_type', '')}
            Category: {ad.get('category', '')}
            Platform: {ad.get('platform', '')}
            Ad Type: {ad.get('ad_type', '')}
            Target Audience: {ad.get('target_audience', '')}
            Spend: ${ad.get('spend', 0):,}
            Impressions: {ad.get('impressions', 0):,}

            Please provide analysis in this exact JSON format:
            {{
                "marketingStrategy": {{
                    "primaryStrategy": "string",
                    "callToAction": "string", 
                    "valueProposition": "string"
                }},
                "emotionalAnalysis": {{
                    "primaryEmotion": "string",
                    "emotionalScore": number (0-100),
                    "emotionalTriggers": ["string", "string"]
                }},
                "sentimentAnalysis": {{
                    "overallSentiment": "positive|negative|neutral",
                    "sentimentScore": number (-100 to 100),
                    "keyPhrases": ["string", "string", "string"]
                }},
                "hooks": {{
                    "primaryHook": "string",
                    "hookType": "curiosity|urgency|social_proof|fear|benefit|story",
                    "hookEffectiveness": number (0-100)
                }},
                "performanceMetrics": {{
                    "estimatedEngagement": number (0-100),
                    "conversionPotential": number (0-100),
                    "viralityScore": number (0-100)
                }}
            }}

            Focus on:
            1. Marketing strategy and positioning
            2. Emotional triggers and psychological appeal
            3. Sentiment and tone analysis
            4. Hook types and effectiveness
            5. Performance potential metrics
            """
            
            try:
                # Call Gemini API for analysis
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
                headers = {"Content-Type": "application/json"}
                
                data_request = {
                    "contents": [{"parts": [{"text": analysis_prompt}]}],
                    "generationConfig": {
                        "temperature": 0.3,
                        "topP": 0.8,
                        "topK": 40,
                        "maxOutputTokens": 2000
                    }
                }
                
                response = requests.post(url, headers=headers, json=data_request)
                
                if response.status_code == 200:
                    result = response.json()
                    if 'candidates' in result and len(result['candidates']) > 0:
                        content = result['candidates'][0]['content']
                        if 'parts' in content and len(content['parts']) > 0:
                            analysis_text = content['parts'][0]['text']
                            
                            # Try to extract JSON from the response
                            import json
                            import re
                            
                            # Find JSON in the response
                            json_match = re.search(r'\{.*\}', analysis_text, re.DOTALL)
                            if json_match:
                                analysis_json = json.loads(json_match.group())
                                analysis_results.append({
                                    "ad": ad,
                                    **analysis_json
                                })
                            else:
                                # Fallback to mock data if JSON parsing fails
                                logger.warning(f"Could not parse JSON from analysis for ad {i+1}")
                                analysis_results.append(generate_mock_analysis(ad, i))
                        else:
                            analysis_results.append(generate_mock_analysis(ad, i))
                    else:
                        analysis_results.append(generate_mock_analysis(ad, i))
                else:
                    logger.error(f"Gemini API error for ad {i+1}: {response.status_code}")
                    analysis_results.append(generate_mock_analysis(ad, i))
                    
            except Exception as e:
                logger.error(f"Error analyzing ad {i+1}: {e}")
                analysis_results.append(generate_mock_analysis(ad, i))
        
        return jsonify(analysis_results)
        
    except Exception as e:
        logger.error(f"Error in analyze_ads endpoint: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/generate-insights', methods=['POST', 'OPTIONS'])
def generate_insights():
    """Generate smart insights based on competitor ad analysis"""
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    
    # Handle actual POST request
    try:
        data = request.json
        if not data or 'analysis' not in data:
            return jsonify({"error": "Missing analysis parameter"}), 400
        
        analysis = data['analysis']
        if not analysis or len(analysis) == 0:
            return jsonify({"error": "No analysis provided for insights"}), 400
        
        logger.info(f"Generating insights from {len(analysis)} ad analyses")
        
        if not GEMINI_API_KEY:
            return jsonify({"error": "Gemini API key not configured"}), 503
        
        # Create insights prompt
        insights_prompt = f"""
        As a marketing expert, analyze these competitor ad analyses and provide actionable insights for creating better ads:

        {json.dumps(analysis, indent=2)}

        Based on this analysis, provide comprehensive insights in this exact JSON format:
        {{
            "competitiveAnalysis": {{
                "strengths": ["string", "string", "string"],
                "weaknesses": ["string", "string", "string"],
                "opportunities": ["string", "string", "string"],
                "threats": ["string", "string", "string"]
            }},
            "strategicRecommendations": {{
                "marketingStrategy": ["string", "string", "string"],
                "emotionalAppeal": ["string", "string", "string"],
                "hookOptimization": ["string", "string", "string"],
                "performanceOptimization": ["string", "string", "string"]
            }},
            "creativeGuidelines": {{
                "messaging": ["string", "string", "string"],
                "visualElements": ["string", "string", "string"],
                "callToAction": ["string", "string", "string"],
                "toneOfVoice": ["string", "string", "string"]
            }},
            "implementationPlan": {{
                "immediateActions": ["string", "string", "string"],
                "shortTermGoals": ["string", "string", "string"],
                "longTermStrategy": ["string", "string", "string"],
                "successMetrics": ["string", "string", "string"]
            }},
            "competitiveAdvantage": {{
                "uniquePositioning": "string",
                "differentiationStrategy": "string",
                "valueProposition": "string",
                "targetAudience": "string"
            }}
        }}

        Focus on:
        1. Identifying gaps in competitor strategies
        2. Opportunities for differentiation
        3. Specific actionable recommendations
        4. Creative and messaging improvements
        5. Performance optimization strategies
        6. Implementation roadmap
        """
        
        try:
            # Call Gemini API for insights
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            headers = {"Content-Type": "application/json"}
            
            data_request = {
                "contents": [{"parts": [{"text": insights_prompt}]}],
                "generationConfig": {
                    "temperature": 0.4,
                    "topP": 0.8,
                    "topK": 40,
                    "maxOutputTokens": 3000
                }
            }
            
            response = requests.post(url, headers=headers, json=data_request)
            
            if response.status_code == 200:
                result = response.json()
                if 'candidates' in result and len(result['candidates']) > 0:
                    content = result['candidates'][0]['content']
                    if 'parts' in content and len(content['parts']) > 0:
                        insights_text = content['parts'][0]['text']
                        
                        # Try to extract JSON from the response
                        # Find JSON in the response
                        json_match = re.search(r'\{.*\}', insights_text, re.DOTALL)
                        if json_match:
                            insights_json = json.loads(json_match.group())
                            return jsonify(insights_json)
                        else:
                            # Fallback to mock insights if JSON parsing fails
                            logger.warning("Could not parse JSON from insights generation")
                            return jsonify(generate_mock_insights(analysis))
                    else:
                        return jsonify(generate_mock_insights(analysis))
                else:
                    return jsonify(generate_mock_insights(analysis))
            else:
                logger.error(f"Gemini API error for insights: {response.status_code}")
                return jsonify(generate_mock_insights(analysis))
                
        except Exception as e:
            logger.error(f"Error generating insights: {e}")
            return jsonify(generate_mock_insights(analysis))
        
    except Exception as e:
        logger.error(f"Error in generate_insights endpoint: {e}")
        return jsonify({"error": "Internal server error"}), 500

def generate_mock_insights(analysis):
    """Generate mock insights data for fallback"""
    
    # Analyze the provided analysis to generate relevant insights
    strategies = [item.get('marketingStrategy', {}).get('primaryStrategy', '') for item in analysis]
    emotions = [item.get('emotionalAnalysis', {}).get('primaryEmotion', '') for item in analysis]
    sentiments = [item.get('sentimentAnalysis', {}).get('overallSentiment', '') for item in analysis]
    
    # Identify common patterns
    common_strategy = max(set(strategies), key=strategies.count) if strategies else 'General'
    common_emotion = max(set(emotions), key=emotions.count) if emotions else 'Neutral'
    avg_sentiment = 'positive' if sentiments.count('positive') > len(sentiments)/2 else 'negative' if sentiments.count('negative') > len(sentiments)/2 else 'neutral'
    
    return {
        "competitiveAnalysis": {
            "strengths": [
                f"Competitors are using {common_strategy} effectively",
                "Strong emotional connection through targeted messaging",
                "Consistent brand positioning across campaigns"
            ],
            "weaknesses": [
                "Limited differentiation in messaging approach",
                "Over-reliance on single emotional trigger",
                "Generic call-to-action strategies"
            ],
            "opportunities": [
                "Gap in unique value proposition messaging",
                "Potential for innovative hook strategies",
                "Room for improved emotional storytelling"
            ],
            "threats": [
                "Market saturation with similar approaches",
                "Risk of being perceived as generic",
                "Potential loss of competitive edge"
            ]
        },
        "strategicRecommendations": {
            "marketingStrategy": [
                f"Differentiate from {common_strategy} approach",
                "Focus on unique value proposition",
                "Implement multi-channel strategy"
            ],
            "emotionalAppeal": [
                f"Counter {common_emotion} with complementary emotions",
                "Create emotional journey in messaging",
                "Build deeper emotional connections"
            ],
            "hookOptimization": [
                "Develop unique hook patterns",
                "Test curiosity-driven approaches",
                "Implement urgency without pressure"
            ],
            "performanceOptimization": [
                "A/B test multiple messaging approaches",
                "Optimize for higher engagement rates",
                "Focus on conversion optimization"
            ]
        },
        "creativeGuidelines": {
            "messaging": [
                "Lead with unique value proposition",
                "Use storytelling to create connection",
                "Include social proof elements"
            ],
            "visualElements": [
                "Use contrasting colors to stand out",
                "Implement dynamic visual storytelling",
                "Focus on human-centric imagery"
            ],
            "callToAction": [
                "Create urgency without pressure",
                "Use action-oriented language",
                "Offer clear value exchange"
            ],
            "toneOfVoice": [
                "Maintain professional yet approachable tone",
                "Use conversational language",
                "Build trust through authenticity"
            ]
        },
        "implementationPlan": {
            "immediateActions": [
                "Audit current messaging strategy",
                "Identify unique value propositions",
                "Plan A/B testing framework"
            ],
            "shortTermGoals": [
                "Develop differentiated messaging",
                "Create new creative assets",
                "Implement tracking mechanisms"
            ],
            "longTermStrategy": [
                "Build brand differentiation",
                "Establish market leadership",
                "Create sustainable competitive advantage"
            ],
            "successMetrics": [
                "Engagement rate improvement",
                "Conversion rate optimization",
                "Brand recognition growth"
            ]
        },
        "competitiveAdvantage": {
            "uniquePositioning": f"Differentiate from {common_strategy} approach with innovative messaging",
            "differentiationStrategy": "Focus on unique value propositions and emotional storytelling",
            "valueProposition": "Provide clear, compelling reasons to choose your brand",
            "targetAudience": "Identify and target underserved audience segments"
        }
    }

def generate_mock_analysis(ad, index):
    """Generate mock analysis data for fallback"""
    
    # Analyze ad content for more realistic metrics
    ad_text = ad.get('ad_creative_body', '').lower()
    business_type = ad.get('business_type', '').lower()
    category = ad.get('category', '').lower()
    spend = ad.get('spend', 0)
    impressions = ad.get('impressions', 0)
    
    # Base strategies based on content analysis
    strategies = ['Emotional Storytelling', 'Social Proof', 'Urgency & Scarcity', 'Problem-Solution', 'Benefit-Driven', 'Exclusive Access', 'Limited Time Offer']
    emotions = ['Excitement', 'Trust', 'Curiosity', 'Urgency', 'Joy', 'Relief', 'Confidence', 'Inspiration']
    ctas = ['Shop Now', 'Learn More', 'Get Started', 'Try Free', 'Join Today', 'Download Now', 'Book Now', 'Sign Up']
    value_props = ['Save 50% today only', 'Join 10,000+ satisfied customers', 'Transform your life in 30 days', 'Limited time offer', 'Exclusive access', 'Proven results']
    hooks = ['What if you could...', 'Imagine having...', 'Don\'t miss out on...', 'Discover the secret...', 'Transform your...', 'Unlock the power of...']
    hook_types = ['curiosity', 'urgency', 'social_proof', 'fear', 'benefit', 'story', 'exclusive']
    triggers = ['Limited time', 'Exclusive access', 'Social proof', 'Personal benefit', 'Scarcity', 'Authority', 'Reciprocity']
    phrases = ['amazing results', 'best value', 'limited time', 'exclusive offer', 'proven method', 'transform', 'discover', 'unlock']
    
    # Content-based strategy selection
    if any(word in ad_text for word in ['limited', 'today only', 'offer', 'sale']):
        strategy = 'Urgency & Scarcity'
    elif any(word in ad_text for word in ['join', 'community', 'people', 'customers']):
        strategy = 'Social Proof'
    elif any(word in ad_text for word in ['transform', 'change', 'improve', 'better']):
        strategy = 'Benefit-Driven'
    elif any(word in ad_text for word in ['problem', 'struggle', 'difficult', 'challenge']):
        strategy = 'Problem-Solution'
    else:
        strategy = strategies[index % len(strategies)]
    
    # Performance metrics based on ad characteristics
    base_engagement = 45
    base_conversion = 25
    base_virality = 35
    
    # Adjust based on business type
    if 'e-commerce' in business_type:
        base_engagement += 10
        base_conversion += 15
    elif 'technology' in business_type:
        base_engagement += 15
        base_virality += 20
    elif 'health' in business_type or 'fitness' in business_type:
        base_engagement += 8
        base_conversion += 10
    
    # Adjust based on spend (higher spend often correlates with better targeting)
    if spend > 10000:
        base_engagement += 8
        base_conversion += 12
    elif spend > 5000:
        base_engagement += 5
        base_conversion += 8
    
    # Add randomness but keep within realistic bounds
    engagement = min(95, max(20, base_engagement + random.uniform(-10, 15)))
    conversion = min(85, max(10, base_conversion + random.uniform(-8, 12)))
    virality = min(90, max(15, base_virality + random.uniform(-12, 18)))
    
    # Sentiment analysis based on content
    positive_words = ['amazing', 'best', 'great', 'excellent', 'perfect', 'love', 'wonderful', 'fantastic']
    negative_words = ['worst', 'terrible', 'awful', 'horrible', 'bad', 'hate', 'disappointing']
    
    positive_count = sum(1 for word in positive_words if word in ad_text)
    negative_count = sum(1 for word in negative_words if word in ad_text)
    
    if positive_count > negative_count:
        sentiment = 'positive'
        sentiment_score = 30 + random.uniform(20, 50)
    elif negative_count > positive_count:
        sentiment = 'negative'
        sentiment_score = -30 - random.uniform(20, 50)
    else:
        sentiment = 'neutral'
        sentiment_score = random.uniform(-20, 20)
    
    return {
        "ad": ad,
        "marketingStrategy": {
            "primaryStrategy": strategy,
            "callToAction": ctas[index % len(ctas)],
            "valueProposition": value_props[index % len(value_props)]
        },
        "emotionalAnalysis": {
            "primaryEmotion": emotions[index % len(emotions)],
            "emotionalScore": 60 + random.uniform(10, 35),
            "emotionalTriggers": random.sample(triggers, 3)
        },
        "sentimentAnalysis": {
            "overallSentiment": sentiment,
            "sentimentScore": sentiment_score,
            "keyPhrases": random.sample(phrases, 3)
        },
        "hooks": {
            "primaryHook": hooks[index % len(hooks)],
            "hookType": hook_types[index % len(hook_types)],
            "hookEffectiveness": 55 + random.uniform(10, 40)
        },
        "performanceMetrics": {
            "estimatedEngagement": round(engagement, 1),
            "conversionPotential": round(conversion, 1),
            "viralityScore": round(virality, 1)
        }
    }

@app.route('/api/generate-campaign-strategy', methods=['POST', 'OPTIONS'])
def generate_campaign_strategy():
    """Generate marketing strategy using Gemini API"""
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    
    try:
        data = request.get_json()
        insights = data.get('insights', {})
        campaign_data = data.get('campaignData', {})
        
        if not GEMINI_API_KEY:
            # Provide mock response when API key is not configured
            logger.warning("Gemini API key not configured, providing mock response")
            return jsonify({
                "marketingStrategy": {
                    "primaryStrategy": "Mock Strategy: Focus on unique value proposition and emotional storytelling based on competitive insights",
                    "keyMessages": [
                        "Differentiate from competitors with innovative messaging",
                        "Leverage emotional appeal for deeper connections",
                        "Implement data-driven optimization strategies"
                    ],
                    "emotionalAppeal": "Create emotional journey from problem awareness to solution satisfaction",
                    "hookStrategy": "Use curiosity-driven hooks with social proof elements"
                },
                "creativeElements": {
                    "headline": "Transform Your [Industry] Experience Today",
                    "subheadline": "Discover the innovative approach that's changing everything",
                    "callToAction": "Get Started Now - Limited Time Offer"
                }
            })
        
        # Create a comprehensive prompt for Gemini
        prompt = f"""
        As a marketing expert, analyze the following insights and campaign data to generate a comprehensive marketing strategy:
        
        INSIGHTS DATA:
        - Competitive Advantage: {insights.get('competitiveAdvantage', {}).get('uniquePositioning', 'Not specified')}
        - Strategic Recommendations: {insights.get('strategicRecommendations', {}).get('marketingStrategy', [])}
        - Creative Guidelines: {insights.get('creativeGuidelines', {})}
        
        CAMPAIGN DATA:
        - Platform: {campaign_data.get('platform', 'Not specified')}
        - Objective: {campaign_data.get('objective', 'Not specified')}
        - Target Audience: {campaign_data.get('targetAudience', 'Not specified')}
        - Budget: ${campaign_data.get('budget', 0)}
        
        Please provide:
        1. Enhanced marketing strategy with specific tactics
        2. Creative elements (headline, subheadline, call-to-action)
        3. Emotional appeal strategy
        4. Hook strategy for audience engagement
        5. Key messaging points
        
        Format the response as JSON with the following structure:
        {{
            "marketingStrategy": {{
                "primaryStrategy": "detailed strategy description",
                "keyMessages": ["message1", "message2", "message3"],
                "emotionalAppeal": "emotional appeal strategy",
                "hookStrategy": "hook strategy description"
            }},
            "creativeElements": {{
                "headline": "compelling headline",
                "subheadline": "supporting subheadline",
                "callToAction": "strong call to action"
            }}
        }}
        """
        
        # Call Gemini API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        headers = {"Content-Type": "application/json"}
        
        data = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.7,
                "topP": 0.9,
                "topK": 40,
                "maxOutputTokens": 1500
            }
        }
        
        response = requests.post(url, headers=headers, json=data)
        
        if response.status_code == 200:
            result = response.json()
            generated_text = result['candidates'][0]['content']['parts'][0]['text']
            
            # Try to extract JSON from the response
            try:
                # Find JSON content in the response
                import re
                json_match = re.search(r'\{.*\}', generated_text, re.DOTALL)
                if json_match:
                    strategy_data = json.loads(json_match.group())
                    return jsonify(strategy_data)
                else:
                    # Fallback: return structured data based on the text
                    return jsonify({
                        "marketingStrategy": {
                            "primaryStrategy": generated_text[:200] + "...",
                            "keyMessages": ["Generated from AI insights", "Optimized for your platform", "Data-driven approach"],
                            "emotionalAppeal": "Emotional appeal strategy generated from insights",
                            "hookStrategy": "Hook strategy based on competitive analysis"
                        },
                        "creativeElements": {
                            "headline": "AI-Generated Compelling Headline",
                            "subheadline": "Supporting subheadline based on insights",
                            "callToAction": "Strong call to action from strategy"
                        }
                    })
            except json.JSONDecodeError:
                # Fallback response
                return jsonify({
                    "marketingStrategy": {
                        "primaryStrategy": generated_text[:200] + "...",
                        "keyMessages": ["Generated from AI insights", "Optimized for your platform", "Data-driven approach"],
                        "emotionalAppeal": "Emotional appeal strategy generated from insights",
                        "hookStrategy": "Hook strategy based on competitive analysis"
                        },
                    "creativeElements": {
                        "headline": "AI-Generated Compelling Headline",
                        "subheadline": "Supporting subheadline based on insights",
                        "callToAction": "Strong call to action from strategy"
                    }
                })
        else:
            return jsonify({"error": "Failed to generate strategy"}), 500
            
    except Exception as e:
        logger.error(f"Error generating campaign strategy: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/generate-campaign-image', methods=['POST', 'OPTIONS'])
def generate_campaign_image():
    """Generate campaign image using DALL-E API"""
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    
    try:
        data = request.get_json()
        campaign = data.get('campaign', {})
        insights = data.get('insights', {})
        
        # Get OpenAI API key from environment
        openai_api_key = os.getenv('OPENAI_API_KEY')
        if not openai_api_key:
            # Provide mock response when API key is not configured
            logger.warning("OpenAI API key not configured, providing mock image URL")
            return jsonify({
                "imageUrl": "https://picsum.photos/1024/1024?random=1",
                "prompt": "Mock DALL-E prompt - professional marketing campaign visual",
                "note": "This is a placeholder image from Picsum. Set OPENAI_API_KEY to generate real AI images."
            })
        
        # Create a detailed prompt for DALL-E
        prompt = f"""
        Create a professional marketing campaign visual for:
        
        Platform: {campaign.get('platform', 'social media')}
        Objective: {campaign.get('objective', 'brand awareness')}
        Headline: {campaign.get('creativeElements', {}).get('headline', 'Compelling headline')}
        Visual Style: {campaign.get('creativeElements', {}).get('visualStyle', 'modern and professional')}
        Tone: {campaign.get('creativeElements', {}).get('toneOfVoice', 'professional and engaging')}
        
        The image should be:
        - High quality and professional
        - Suitable for {campaign.get('platform', 'social media')} advertising
        - Visually appealing and modern
        - Include space for text overlay
        - Match the {campaign.get('creativeElements', {}).get('visualStyle', 'modern')} style
        
        Style: Digital art, marketing design, professional advertising, clean and modern
        """
        
        # Call OpenAI DALL-E API
        url = "https://api.openai.com/v1/images/generations"
        headers = {
            "Authorization": f"Bearer {openai_api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "dall-e-3",
            "prompt": prompt,
            "n": 1,
            "size": "1024x1024",
            "quality": "standard",
            "style": "natural"
        }
        
        response = requests.post(url, headers=headers, json=data)
        
        if response.status_code == 200:
            result = response.json()
            image_url = result['data'][0]['url']
            
            return jsonify({
                "imageUrl": image_url,
                "prompt": prompt
            })
        else:
            logger.error(f"DALL-E API error: {response.text}")
            return jsonify({"error": "Failed to generate image"}), 500
            
    except Exception as e:
        logger.error(f"Error generating campaign image: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Start server
if __name__ == '__main__':
    logger.info("Starting server...")
    port = int(os.environ.get('PORT', 5000))
    logger.info(f"Starting server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
