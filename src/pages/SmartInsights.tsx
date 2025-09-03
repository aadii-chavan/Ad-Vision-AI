import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lightbulb,
  Target,
  TrendingUp,
  Brain,
  Heart,
  Zap,
  Eye,
  DollarSign,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Users,
  MessageSquare,
  PieChart,
  Activity,
  Award,
  TrendingDown,
  Minus,
  Star,
  Shield,
  Rocket,
  Clock,
  BarChart3,
  Settings,
  Palette,
  Megaphone,
  Calendar,
  Flag
} from 'lucide-react';
import { motion } from 'framer-motion';
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

const SmartInsights: React.FC = () => {
  const [analysis, setAnalysis] = useState<AdAnalysis[]>([]);
  const [insights, setInsights] = useState<SmartInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnalysis = () => {
      try {
        const stored = localStorage.getItem('adAnalysisForInsights');
        if (stored) {
          const analysisData = JSON.parse(stored);
          setAnalysis(analysisData);
          generateInsights(analysisData);
        } else {
          setError('No analysis data found. Please analyze some ads first.');
          setLoading(false);
        }
      } catch (error) {
        setError('Failed to load analysis data');
        setLoading(false);
      }
    };

    loadAnalysis();
  }, []);

  const generateInsights = async (analysisData: AdAnalysis[]) => {
    setGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:5001/api/generate-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ analysis: analysisData }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const insightsData = await response.json();
      setInsights(insightsData);
      
      // Store insights in localStorage for Campaign Creation page
      localStorage.setItem('generatedInsights', JSON.stringify(insightsData));
    } catch (error) {
      console.error('Insights generation error:', error);
      setError('Failed to generate insights. Please try again.');
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strengths': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'weaknesses': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'opportunities': return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'threats': return <Shield className="w-5 h-5 text-orange-600" />;
      default: return <Lightbulb className="w-5 h-5 text-purple-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strengths': return 'bg-green-50 border-green-200 text-green-800';
      case 'weaknesses': return 'bg-red-50 border-red-200 text-red-800';
      case 'opportunities': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'threats': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  if (loading) {
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
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Generating Smart Insights</h2>
                <p className="text-muted-foreground">AI is analyzing your competitor data...</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

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
                <h2 className="text-2xl font-bold mb-2">Insights Error</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={() => navigate('/analytics')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Analytics
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
                <Button variant="outline" onClick={() => navigate('/analytics')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Smart Insights</h1>
                  <p className="text-muted-foreground">AI-powered recommendations to outperform your competition</p>
                </div>
              </div>
              {generating && (
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating insights...</span>
                </div>
              )}
              {insights && (
                <Button onClick={() => navigate('/campaign-creation')} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Rocket className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              )}
            </div>

            {insights && (
              <>
                {/* Competitive Advantage Summary */}
                <Card className="mb-8 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      Your Competitive Advantage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-white/90 mb-2">Unique Positioning</h4>
                        <p className="text-white bg-white/20 p-3 rounded-lg border border-white/30">
                          {insights.competitiveAdvantage.uniquePositioning}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white/90 mb-2">Value Proposition</h4>
                        <p className="text-white bg-white/20 p-3 rounded-lg border border-white/30">
                          {insights.competitiveAdvantage.valueProposition}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white/90 mb-2">Differentiation Strategy</h4>
                        <p className="text-white bg-white/20 p-3 rounded-lg border border-white/30">
                          {insights.competitiveAdvantage.differentiationStrategy}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white/90 mb-2">Target Audience</h4>
                        <p className="text-white bg-white/20 p-3 rounded-lg border border-white/30">
                          {insights.competitiveAdvantage.targetAudience}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Main Insights Tabs */}
                <Tabs defaultValue="competitive" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="competitive" className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Competitive
                    </TabsTrigger>
                    <TabsTrigger value="strategic" className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Strategic
                    </TabsTrigger>
                    <TabsTrigger value="creative" className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Creative
                    </TabsTrigger>
                    <TabsTrigger value="implementation" className="flex items-center gap-2">
                      <Rocket className="w-4 h-4" />
                      Implementation
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Summary
                    </TabsTrigger>
                  </TabsList>

                  {/* Competitive Analysis */}
                  <TabsContent value="competitive" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {Object.entries(insights.competitiveAnalysis).map(([key, items]) => (
                        <Card key={key} className="text-white">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                              <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                                {getInsightIcon(key)}
                              </div>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {items.map((item, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                                  <span className="text-sm text-white">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Strategic Recommendations */}
                  <TabsContent value="strategic" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {Object.entries(insights.strategicRecommendations).map(([key, items]) => (
                        <Card key={key} className="text-white">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                              <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                                {key === 'marketingStrategy' && <Target className="w-5 h-5 text-white" />}
                                {key === 'emotionalAppeal' && <Heart className="w-5 h-5 text-white" />}
                                {key === 'hookOptimization' && <Zap className="w-5 h-5 text-white" />}
                                {key === 'performanceOptimization' && <TrendingUp className="w-5 h-5 text-white" />}
                              </div>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {items.map((item, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                                  <span className="text-sm text-white">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Creative Guidelines */}
                  <TabsContent value="creative" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {Object.entries(insights.creativeGuidelines).map(([key, items]) => (
                        <Card key={key} className="text-white">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                              <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                                {key === 'messaging' && <MessageSquare className="w-5 h-5 text-white" />}
                                {key === 'visualElements' && <Palette className="w-5 h-5 text-white" />}
                                {key === 'callToAction' && <Megaphone className="w-5 h-5 text-white" />}
                                {key === 'toneOfVoice' && <Users className="w-5 h-5 text-white" />}
                              </div>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {items.map((item, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                                  <span className="text-sm text-white">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Implementation Plan */}
                  <TabsContent value="implementation" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {Object.entries(insights.implementationPlan).map(([key, items]) => (
                        <Card key={key} className="text-white">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                              <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                                {key === 'immediateActions' && <Rocket className="w-5 h-5 text-white" />}
                                {key === 'shortTermGoals' && <Clock className="w-5 h-5 text-white" />}
                                {key === 'longTermStrategy' && <TrendingUp className="w-5 h-5 text-white" />}
                                {key === 'successMetrics' && <Flag className="w-5 h-5 text-white" />}
                              </div>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {items.map((item, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                                  <span className="text-sm text-white">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Summary */}
                  <TabsContent value="summary" className="space-y-6">
                    <Card className="text-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                          <div className="p-2 rounded-lg bg-white/20 border border-white/30">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          Key Takeaways
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                              <Target className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="font-semibold text-white/90 mb-2">Focus Areas</h4>
                            <p className="text-sm text-white/80">
                              {insights.competitiveAdvantage.uniquePositioning}
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                              <Rocket className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="font-semibold text-white/90 mb-2">Next Steps</h4>
                            <p className="text-sm text-white/80">
                              Start with immediate actions and build momentum
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                              <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="font-semibold text-white/90 mb-2">Success Path</h4>
                            <p className="text-sm text-white/80">
                              Follow the implementation plan for optimal results
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SmartInsights;
