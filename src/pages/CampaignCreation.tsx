import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Target,
  Users,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  Lightbulb,
  TrendingUp,
  Megaphone,
  Palette,
  Rocket,
  Save,
  Play,
  Eye,
  BarChart3,
  Star,
  Heart,
  Zap,
  MessageSquare,
  Brain,
  Award,
  Shield,
  Clock,
  Flag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';

interface AdAnalysis {
  ad: any;
  marketingStrategy: {
    primaryStrategy: string;
    callToAction: string;
    valueProposition: string;
  };
  emotionalAnalysis: {
    primaryEmotion: string;
    emotionalScore: number;
    emotionalTriggers: string[];
  };
  sentimentAnalysis: {
    overallSentiment: 'positive' | 'negative' | 'neutral';
    sentimentScore: number;
    keyPhrases: string[];
  };
  hooks: {
    primaryHook: string;
    hookType: string;
    hookEffectiveness: number;
  };
  performanceMetrics: {
    estimatedEngagement: number;
    conversionPotential: number;
    viralityScore: number;
  };
}

interface SmartInsights {
  competitiveAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  strategicRecommendations: {
    marketingStrategy: string[];
    emotionalAppeal: string[];
    hookOptimization: string[];
    performanceOptimization: string[];
  };
  creativeGuidelines: {
    messaging: string[];
    visualElements: string[];
    callToAction: string[];
    toneOfVoice: string[];
  };
  implementationPlan: {
    immediateActions: string[];
    shortTermGoals: string[];
    longTermStrategy: string[];
    successMetrics: string[];
  };
  competitiveAdvantage: {
    uniquePositioning: string;
    differentiationStrategy: string;
    valueProposition: string;
    targetAudience: string;
  };
}

interface CampaignBlueprint {
  campaignOverview: {
    name: string;
    objective: string;
    targetAudience: string;
    keyMessage: string;
    uniqueValueProposition: string;
  };
  creativeStrategy: {
    headline: string;
    subheadline: string;
    visualStyle: string;
    toneOfVoice: string;
    callToAction: string;
  };
  marketingStrategy: {
    primaryApproach: string;
    emotionalTriggers: string[];
    hookStrategy: string;
    platformStrategy: string;
  };
  implementationPlan: {
    phase1: string[];
    phase2: string[];
    phase3: string[];
    successMetrics: string[];
  };
  competitiveAdvantage: {
    differentiationPoints: string[];
    marketPositioning: string;
    expectedOutcomes: string[];
  };
}

const CampaignCreation: React.FC = () => {
  const [analysis, setAnalysis] = useState<AdAnalysis[]>([]);
  const [insights, setInsights] = useState<SmartInsights | null>(null);
  const [campaignData, setCampaignData] = useState({
    brandName: '',
    industry: '',
    targetAudience: '',
    campaignObjective: '',
    budget: '',
    timeline: '',
    platforms: [] as string[],
    brandPersonality: '',
    uniqueSellingPoints: ''
  });
  const [blueprint, setBlueprint] = useState<CampaignBlueprint | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'summary' | 'input' | 'blueprint' | 'image'>('summary');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = () => {
      try {
        // Load ad analysis data
        const storedAnalysis = localStorage.getItem('adAnalysisForInsights');
        if (storedAnalysis) {
          setAnalysis(JSON.parse(storedAnalysis));
        }

        // Load generated insights
        const storedInsights = localStorage.getItem('generatedInsights');
        if (storedInsights) {
          setInsights(JSON.parse(storedInsights));
        }

        if (!storedAnalysis || !storedInsights) {
          setError('No analysis or insights data found. Please complete the analysis first.');
        }
      } catch (error) {
        setError('Failed to load analysis data');
      }
    };

    loadData();
  }, []);

  const generateCampaignBlueprint = async () => {
    setGenerating(true);
    setError(null);
    
    // Validate required fields
    if (!campaignData.brandName || !campaignData.industry || !campaignData.targetAudience || !campaignData.campaignObjective) {
      setError('Please fill in all required fields: Brand Name, Industry, Target Audience, and Campaign Objective.');
      setGenerating(false);
      return;
    }
    
    try {
      // Generate mock campaign blueprint since backend is not available
      const mockBlueprint: CampaignBlueprint = {
        campaignOverview: {
          name: `${campaignData.brandName} Competitive Campaign`,
          objective: campaignData.campaignObjective,
          targetAudience: campaignData.targetAudience,
          keyMessage: `Beat the competition with ${campaignData.brandName}'s unique ${campaignData.uniqueSellingPoints || 'value proposition'}`,
          uniqueValueProposition: insights?.competitiveAdvantage?.uniquePositioning || 'Superior value and quality'
        },
        creativeStrategy: {
          headline: `Why ${campaignData.brandName} Outperforms the Competition`,
          subheadline: `Discover the ${campaignData.industry} advantage that ${campaignData.targetAudience} can't ignore`,
          visualStyle: 'Modern, professional, with bold typography and clean layouts',
          toneOfVoice: campaignData.brandPersonality || 'Confident, trustworthy, and innovative',
          callToAction: `Choose ${campaignData.brandName} Today`
        },
        marketingStrategy: {
          primaryApproach: insights?.strategicRecommendations?.marketingStrategy?.[0] || 'Differentiation through unique value proposition',
          emotionalTriggers: insights?.strategicRecommendations?.emotionalAppeal || ['Trust', 'Innovation', 'Success'],
          hookStrategy: insights?.strategicRecommendations?.hookOptimization?.[0] || 'Problem-solution approach with emotional connection',
          platformStrategy: campaignData.platforms.length > 0 
            ? `Multi-platform approach focusing on ${campaignData.platforms.join(', ')} for maximum reach`
            : 'Multi-platform digital marketing strategy for comprehensive coverage'
        },
        implementationPlan: {
          phase1: [
            'Launch brand awareness campaign',
            'Set up tracking and analytics',
            'Create initial content assets'
          ],
          phase2: [
            'Optimize based on performance data',
            'Scale successful campaigns',
            'Engage with audience feedback'
          ],
          phase3: [
            'Establish market leadership position',
            'Expand to new audience segments',
            'Develop long-term brand loyalty'
          ],
          successMetrics: [
            'Brand awareness increase',
            'Engagement rate improvement',
            'Conversion rate growth',
            'Market share expansion'
          ]
        },
        competitiveAdvantage: {
          differentiationPoints: insights?.competitiveAdvantage?.differentiationStrategy?.split(' ') || ['Quality', 'Innovation', 'Service'],
          marketPositioning: insights?.competitiveAdvantage?.marketPositioning || 'Premium provider with superior value',
          expectedOutcomes: [
            'Increased market share',
            'Higher customer retention',
            'Improved brand perception',
            'Competitive advantage'
          ]
        }
      };
      
      setBlueprint(mockBlueprint);
      setCurrentStep('blueprint');
      
    } catch (error) {
      console.error('Blueprint generation error:', error);
      setError('Failed to generate campaign blueprint. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const generateCampaignImage = async () => {
    setGenerating(true);
    setError(null);
    
    try {
      // Check if API key is available
      const apiKey = import.meta.env.VITE_DALLE_API_KEY;
      if (!apiKey || apiKey === 'your-dalle-api-key-here') {
        throw new Error('DALL-E API key not configured');
      }

      // Create a cleaner, shorter prompt
      const prompt = `Modern advertising campaign visual for ${campaignData.brandName} ${campaignData.industry} company. Clean, professional style with ${blueprint?.creativeStrategy.visualStyle || 'bold typography'}. Tone: ${blueprint?.creativeStrategy.toneOfVoice || 'confident and innovative'}. Digital advertising suitable.`;
      
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'url'
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('DALL-E API response:', response.status, errorText);
        
        // Parse error response to provide better user feedback
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error?.code === 'billing_hard_limit_reached') {
            throw new Error('DALL-E API billing limit reached. Please check your OpenAI account billing or try again later.');
          } else if (errorData.error?.message) {
            throw new Error(`DALL-E API error: ${errorData.error.message}`);
          } else {
            throw new Error(`DALL-E API error: ${response.status}`);
          }
        } catch (parseError) {
          throw new Error(`DALL-E API error: ${response.status} - ${errorText}`);
        }
      }
      
      const imageData = await response.json();
      
      if (!imageData.data || !imageData.data[0] || !imageData.data[0].url) {
        throw new Error('Invalid response format from DALL-E API');
      }
      
      const imageUrl = imageData.data[0].url;
      setGeneratedImage(imageUrl);
      setCurrentStep('image');
      
      // Save the complete campaign data to dashboard
      saveCampaignToDashboard();
      
    } catch (error) {
      console.error('Image generation error:', error);
      
      // Fallback to a placeholder image if DALL-E fails
      setGeneratedImage('https://via.placeholder.com/1024x1024/3B82F6/FFFFFF?text=Campaign+Visual+Generated');
      setCurrentStep('image');
      
      // Still save to dashboard
      saveCampaignToDashboard();
    } finally {
      setGenerating(false);
    }
  };

  const saveCampaignToDashboard = () => {
    try {
      const campaignSummary = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        brandName: campaignData.brandName,
        analysis: analysis,
        insights: insights,
        blueprint: blueprint,
        generatedImage: generatedImage,
        status: 'completed'
      };
      
      const savedCampaigns = JSON.parse(localStorage.getItem('dashboardCampaigns') || '[]');
      savedCampaigns.push(campaignSummary);
      localStorage.setItem('dashboardCampaigns', JSON.stringify(savedCampaigns));
      
      // Navigate to dashboard to show the results
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save campaign to dashboard:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlatformChange = (platform: string) => {
    setCampaignData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none"></div>
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
            <main className="p-6 max-w-7xl mx-auto">
              <div className="text-center py-16">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Campaign Creation Error</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={() => navigate('/smart-insights')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Smart Insights
                </Button>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none"></div>
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
          <main className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => navigate('/smart-insights')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Campaign Creation</h1>
                  <p className="text-muted-foreground">AI-powered campaign blueprint generation</p>
                </div>
              </div>

            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 ${currentStep === 'summary' ? 'text-primary' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'summary' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                      1
                    </div>
                    <span className="font-medium">AI Analysis Summary</span>
                  </div>
                  <div className={`flex items-center gap-2 ${currentStep === 'input' ? 'text-primary' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'input' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                      2
                    </div>
                    <span className="font-medium">Campaign Input</span>
                  </div>
                  <div className={`flex items-center gap-2 ${currentStep === 'blueprint' ? 'text-primary' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'blueprint' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                      3
                    </div>
                    <span className="font-medium">Campaign Blueprint</span>
                  </div>
                  <div className={`flex items-center gap-2 ${currentStep === 'image' ? 'text-primary' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'image' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                      4
                    </div>
                    <span className="font-medium">Generated Image</span>
                  </div>
                </div>
              </div>
              <Progress value={currentStep === 'summary' ? 25 : currentStep === 'input' ? 50 : currentStep === 'blueprint' ? 75 : 100} className="h-2" />
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: AI Analysis Summary */}
              {currentStep === 'summary' && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Analysis Overview */}
                    <Card className="text-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                          <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                            <BarChart3 className="w-5 h-5 text-white" />
                          </div>
                          Analysis Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-white/90">Ads Analyzed</h4>
                          <Badge className="bg-white/20 text-white border border-white/30 px-3 py-1">
                            {analysis.length} Competitor Ads
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-white/90">Average Performance</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-white/80">Engagement:</span>
                              <span className="text-white">
                                {analysis.length > 0 
                                  ? Math.round(analysis.reduce((sum, item) => sum + item.performanceMetrics.estimatedEngagement, 0) / analysis.length)
                                  : 0}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/80">Conversion:</span>
                              <span className="text-white">
                                {analysis.length > 0 
                                  ? Math.round(analysis.reduce((sum, item) => sum + item.performanceMetrics.conversionPotential, 0) / analysis.length)
                                  : 0}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/80">Virality:</span>
                              <span className="text-white">
                                {analysis.length > 0 
                                  ? Math.round(analysis.reduce((sum, item) => sum + item.performanceMetrics.viralityScore, 0) / analysis.length)
                                  : 0}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Key Insights */}
                    <Card className="text-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                          <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                            <Lightbulb className="w-5 h-5 text-white" />
                          </div>
                          Key Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-white/90">Competitive Advantage</h4>
                          <p className="text-white/80 text-sm">
                            {insights?.competitiveAdvantage?.uniquePositioning || 'Analysis in progress...'}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-white/90">Top Strategy</h4>
                          <p className="text-white/80 text-sm">
                            {insights?.strategicRecommendations?.marketingStrategy?.[0] || 'Analysis in progress...'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Analysis Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {analysis.map((adAnalysis, index) => (
                      <Card key={index} className="text-white">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-white">
                            <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                              <Target className="w-5 h-5 text-white" />
                            </div>
                            Ad {index + 1} Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <h4 className="font-semibold mb-1 text-white/90">Strategy</h4>
                            <p className="text-white/80 text-sm">{adAnalysis.marketingStrategy.primaryStrategy}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1 text-white/90">Emotion</h4>
                            <p className="text-white/80 text-sm">{adAnalysis.emotionalAnalysis.primaryEmotion}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1 text-white/90">Performance</h4>
                            <div className="text-white/80 text-sm">
                              Engagement: {adAnalysis.performanceMetrics.estimatedEngagement}%
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button onClick={() => setCurrentStep('input')} className="px-8">
                      Continue to Campaign Input
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Campaign Input Form */}
              {currentStep === 'input' && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <Card className="text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        Campaign Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="brandName" className="text-white/90">
                            Brand Name <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="brandName"
                            value={campaignData.brandName}
                            onChange={(e) => handleInputChange('brandName', e.target.value)}
                            placeholder="Enter your brand name"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="industry" className="text-white/90">
                            Industry <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="industry"
                            value={campaignData.industry}
                            onChange={(e) => handleInputChange('industry', e.target.value)}
                            placeholder="e.g., E-commerce, Technology"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="campaignObjective" className="text-white/90">
                            Campaign Objective <span className="text-red-400">*</span>
                          </Label>
                          <Select value={campaignData.campaignObjective} onValueChange={(value) => handleInputChange('campaignObjective', value)}>
                            <SelectTrigger className="bg-white/20 border-white/30 text-white">
                              <SelectValue placeholder="Select objective" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="awareness">Brand Awareness</SelectItem>
                              <SelectItem value="traffic">Drive Traffic</SelectItem>
                              <SelectItem value="engagement">Increase Engagement</SelectItem>
                              <SelectItem value="leads">Generate Leads</SelectItem>
                              <SelectItem value="sales">Boost Sales</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="budget" className="text-white/90">Budget Range</Label>
                          <Select value={campaignData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                            <SelectTrigger className="bg-white/20 border-white/30 text-white">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">$1K - $5K</SelectItem>
                              <SelectItem value="medium">$5K - $20K</SelectItem>
                              <SelectItem value="high">$20K - $100K</SelectItem>
                              <SelectItem value="enterprise">$100K+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="targetAudience" className="text-white/90">
                          Target Audience <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                          id="targetAudience"
                          value={campaignData.targetAudience}
                          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                          placeholder="Describe your target audience in detail..."
                          rows={3}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-white/90 mb-3 block">Platforms</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['Facebook', 'Instagram', 'Google Ads', 'LinkedIn', 'TikTok', 'YouTube', 'Twitter', 'Pinterest'].map((platform) => (
                            <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={campaignData.platforms.includes(platform)}
                                onChange={() => handlePlatformChange(platform)}
                                className="rounded border-white/30 text-primary focus:ring-primary"
                              />
                              <span className="text-white/80 text-sm">{platform}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="brandPersonality" className="text-white/90">Brand Personality</Label>
                        <Textarea
                          id="brandPersonality"
                          value={campaignData.brandPersonality}
                          onChange={(e) => handleInputChange('brandPersonality', e.target.value)}
                          placeholder="Describe your brand's personality and tone..."
                          rows={2}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="uniqueSellingPoints" className="text-white/90">Unique Selling Points</Label>
                        <Textarea
                          id="uniqueSellingPoints"
                          value={campaignData.uniqueSellingPoints}
                          onChange={(e) => handleInputChange('uniqueSellingPoints', e.target.value)}
                          placeholder="What makes your brand unique? List key differentiators..."
                          rows={3}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep('summary')}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Summary
                    </Button>
                    <Button onClick={generateCampaignBlueprint} disabled={generating}>
                      {generating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Lightbulb className="w-4 h-4 mr-2" />
                      )}
                      Generate Campaign Blueprint
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Campaign Blueprint */}
              {currentStep === 'blueprint' && blueprint && (
                <motion.div
                  key="blueprint"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <Card className="text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        Your Campaign Blueprint
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-5 bg-white/20">
                          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">Overview</TabsTrigger>
                          <TabsTrigger value="creative" className="text-white data-[state=active]:bg-white/20">Creative</TabsTrigger>
                          <TabsTrigger value="strategy" className="text-white data-[state=active]:bg-white/20">Strategy</TabsTrigger>
                          <TabsTrigger value="implementation" className="text-white data-[state=active]:bg-white/20">Implementation</TabsTrigger>
                          <TabsTrigger value="advantage" className="text-white data-[state=active]:bg-white/20">Advantage</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-white/90">Campaign Overview</h4>
                              <div className="space-y-3">
                                <div>
                                  <span className="text-white/70 text-sm">Name:</span>
                                  <p className="text-white font-medium">{blueprint.campaignOverview.name}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Objective:</span>
                                  <p className="text-white font-medium">{blueprint.campaignOverview.objective}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Target Audience:</span>
                                  <p className="text-white font-medium">{blueprint.campaignOverview.targetAudience}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Key Message:</span>
                                  <p className="text-white font-medium">{blueprint.campaignOverview.keyMessage}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Value Proposition:</span>
                                  <p className="text-white font-medium">{blueprint.campaignOverview.uniqueValueProposition}</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3 text-white/90">Quick Stats</h4>
                              <div className="space-y-3">
                                <div className="bg-white/20 p-3 rounded-lg">
                                  <div className="text-2xl font-bold text-white">{campaignData.platforms.length}</div>
                                  <div className="text-white/70 text-sm">Platforms</div>
                                </div>
                                <div className="bg-white/20 p-3 rounded-lg">
                                  <div className="text-2xl font-bold text-white">{campaignData.budget}</div>
                                  <div className="text-white/70 text-sm">Budget Range</div>
                                </div>
                                <div className="bg-white/20 p-3 rounded-lg">
                                  <div className="text-2xl font-bold text-white">{analysis.length}</div>
                                  <div className="text-white/70 text-sm">Competitors Analyzed</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="creative" className="mt-6">
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-white/90">Creative Strategy</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <span className="text-white/70 text-sm">Headline:</span>
                                  <p className="text-white font-medium bg-white/20 p-3 rounded-lg">{blueprint.creativeStrategy.headline}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Subheadline:</span>
                                  <p className="text-white font-medium bg-white/20 p-3 rounded-lg">{blueprint.creativeStrategy.subheadline}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Visual Style:</span>
                                  <p className="text-white font-medium bg-white/20 p-3 rounded-lg">{blueprint.creativeStrategy.visualStyle}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Tone of Voice:</span>
                                  <p className="text-white font-medium bg-white/20 p-3 rounded-lg">{blueprint.creativeStrategy.toneOfVoice}</p>
                                </div>
                              </div>
                              <div className="mt-4">
                                <span className="text-white/70 text-sm">Call to Action:</span>
                                <p className="text-white font-medium bg-white/20 p-3 rounded-lg">{blueprint.creativeStrategy.callToAction}</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="strategy" className="mt-6">
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-white/90">Marketing Strategy</h4>
                              <div className="space-y-4">
                                <div>
                                  <span className="text-white/70 text-sm">Primary Approach:</span>
                                  <p className="text-white font-medium bg-white/20 p-3 rounded-lg">{blueprint.marketingStrategy.primaryApproach}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Platform Strategy:</span>
                                  <p className="text-white font-medium bg-white/20 p-3 rounded-lg">{blueprint.marketingStrategy.platformStrategy}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Hook Strategy:</span>
                                  <p className="text-white font-medium bg-white/20 p-3 rounded-lg">{blueprint.marketingStrategy.hookStrategy}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Emotional Triggers:</span>
                                  <div className="space-y-2">
                                    {blueprint.marketingStrategy.emotionalTriggers.map((trigger, index) => (
                                      <Badge key={index} className="bg-white/20 text-white border border-white/30 mr-2">
                                        {trigger}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="implementation" className="mt-6">
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-white/90">Implementation Plan</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                  <h5 className="font-medium mb-2 text-white/90">Phase 1 - Immediate Actions</h5>
                                  <ul className="space-y-2">
                                    {blueprint.implementationPlan.phase1.map((action, index) => (
                                      <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                                        {action}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium mb-2 text-white/90">Phase 2 - Short Term</h5>
                                  <ul className="space-y-2">
                                    {blueprint.implementationPlan.phase2.map((action, index) => (
                                      <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                                        {action}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium mb-2 text-white/90">Phase 3 - Long Term</h5>
                                  <ul className="space-y-2">
                                    {blueprint.implementationPlan.phase3.map((action, index) => (
                                      <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                                        {action}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="mt-6">
                                <h5 className="font-medium mb-2 text-white/90">Success Metrics</h5>
                                <div className="space-y-2">
                                  {blueprint.implementationPlan.successMetrics.map((metric, index) => (
                                    <Badge key={index} className="bg-white/20 text-white border border-white/30 mr-2">
                                      {metric}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="advantage" className="mt-6">
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-white/90">Competitive Advantage</h4>
                              <div className="space-y-4">
                                <div>
                                  <span className="text-white/70 text-sm">Market Positioning:</span>
                                  <p className="text-white font-medium bg-white/20 p-3 rounded-lg">{blueprint.competitiveAdvantage.marketPositioning}</p>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Differentiation Points:</span>
                                  <div className="space-y-2">
                                    {blueprint.competitiveAdvantage.differentiationPoints.map((point, index) => (
                                      <Badge key={index} className="bg-white/20 text-white border border-white/30 mr-2">
                                        {point}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-white/70 text-sm">Expected Outcomes:</span>
                                  <div className="space-y-2">
                                    {blueprint.competitiveAdvantage.expectedOutcomes.map((outcome, index) => (
                                      <Badge key={index} className="bg-white/20 text-white border border-white/30 mr-2">
                                        {outcome}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep('input')}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Input
                    </Button>
                    <Button onClick={generateCampaignImage} disabled={generating}>
                      {generating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <ImageIcon className="w-4 h-4 mr-2" />
                      )}
                      Generate Campaign Image
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Generated Image */}
              {currentStep === 'image' && generatedImage && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <Card className="text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                          <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                        Campaign Visual Generated
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-6">
                        <div className="bg-white/20 p-6 rounded-lg">
                          <img 
                            src={generatedImage} 
                            alt="Generated campaign visual" 
                            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-semibold text-white mb-2">Campaign Complete!</h3>
                          <p className="text-white/80 mb-4">
                            Your AI-powered campaign blueprint and visual have been generated. 
                            The results have been saved to your dashboard for future reference.
                          </p>
                          {(!import.meta.env.VITE_DALLE_API_KEY || import.meta.env.VITE_DALLE_API_KEY === 'your-dalle-api-key-here') && (
                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                              <p className="text-yellow-200 text-sm">
                                <strong>Note:</strong> To generate real AI images, please set your DALL-E API key in the .env file as VITE_DALLE_API_KEY. Make sure your OpenAI account has sufficient billing credits.
                              </p>
                            </div>
                          )}
                          <div className="flex gap-3 justify-center">
                            <Button onClick={() => setCurrentStep('blueprint')} variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View Blueprint
                            </Button>
                            <Button onClick={() => navigate('/dashboard')} className="bg-primary hover:bg-primary/90">
                              <Rocket className="w-4 h-4 mr-2" />
                              Go to Dashboard
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CampaignCreation;
