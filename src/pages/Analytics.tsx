import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Heart, 
  Target, 
  Zap, 
  Eye, 
  DollarSign,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Users,
  MessageSquare,
  PieChart,
  Activity,
  Award,
  TrendingDown,
  Minus
} from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts';

interface Ad {
  ad_creative_body: string;
  ad_snapshot_url: string;
  spend: number;
  impressions: number;
  business_type: string;
  category: string;
  platform: string;
  ad_type: string;
  target_audience: string;
}

interface AdAnalysis {
  ad: Ad;
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

const Analytics: React.FC = () => {
  const [selectedAds, setSelectedAds] = useState<Ad[]>([]);
  const [analysis, setAnalysis] = useState<AdAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSelectedAds = () => {
      try {
        const stored = localStorage.getItem('selectedAdsForAnalysis');
        if (stored) {
          const ads = JSON.parse(stored);
          setSelectedAds(ads);
          analyzeAds(ads);
        } else {
          setError('No ads selected for analysis');
          setLoading(false);
        }
      } catch (error) {
        setError('Failed to load selected ads');
        setLoading(false);
      }
    };

    loadSelectedAds();
  }, []);

  const analyzeAds = async (ads: Ad[]) => {
    setAnalyzing(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/analyze-ads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ ads }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const analysisResults = await response.json();
      setAnalysis(analysisResults);
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Failed to analyze ads. Please try again.');
    } finally {
      setAnalyzing(false);
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-4 h-4" />;
      case 'negative': return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  // Prepare chart data
  const performanceData = analysis.map((item, index) => ({
    name: `Ad ${index + 1}`,
    engagement: item.performanceMetrics.estimatedEngagement,
    conversion: item.performanceMetrics.conversionPotential,
    virality: item.performanceMetrics.viralityScore,
  }));

  const emotionData = analysis.map((item, index) => ({
    name: `Ad ${index + 1}`,
    emotion: item.emotionalAnalysis.emotionalScore,
    hook: item.hooks.hookEffectiveness,
  }));

  const sentimentData = analysis.map((item, index) => ({
    name: `Ad ${index + 1}`,
    sentiment: Math.abs(item.sentimentAnalysis.sentimentScore),
    type: item.sentimentAnalysis.overallSentiment,
  }));

  const strategyData = analysis.reduce((acc, item, index) => {
    const strategy = item.marketingStrategy.primaryStrategy;
    const existing = acc.find(s => s.name === strategy);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: strategy, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

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
                <h2 className="text-2xl font-bold mb-2">Analyzing Ads</h2>
                <p className="text-muted-foreground">AI is processing your selected ads...</p>
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
                <h2 className="text-2xl font-bold mb-2">Analysis Error</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={() => navigate('/competitor-ads')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Competitor Ads
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
                <Button variant="outline" onClick={() => navigate('/competitor-ads')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Ad Analysis Dashboard</h1>
                  <p className="text-muted-foreground">AI-powered insights from {selectedAds.length} selected ads</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {analyzing && (
                  <div className="flex items-center gap-2 text-primary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                )}
                {analysis.length > 0 && (
                  <Button 
                    onClick={() => {
                      localStorage.setItem('adAnalysisForInsights', JSON.stringify(analysis));
                      navigate('/smart-insights');
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Get Smart Insights
                  </Button>
                )}
              </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Avg Engagement</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {analysis.length > 0 
                          ? Math.round(analysis.reduce((sum, item) => sum + item.performanceMetrics.estimatedEngagement, 0) / analysis.length)
                          : 0}%
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Avg Conversion</p>
                      <p className="text-2xl font-bold text-green-900">
                        {analysis.length > 0 
                          ? Math.round(analysis.reduce((sum, item) => sum + item.performanceMetrics.conversionPotential, 0) / analysis.length)
                          : 0}%
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Avg Virality</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {analysis.length > 0 
                          ? Math.round(analysis.reduce((sum, item) => sum + item.performanceMetrics.viralityScore, 0) / analysis.length)
                          : 0}%
                      </p>
                    </div>
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Avg Emotion</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {analysis.length > 0 
                          ? Math.round(analysis.reduce((sum, item) => sum + item.emotionalAnalysis.emotionalScore, 0) / analysis.length)
                          : 0}%
                      </p>
                    </div>
                    <Heart className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Performance Comparison Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Metrics Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="engagement" fill="#3B82F6" name="Engagement %" />
                      <Bar dataKey="conversion" fill="#10B981" name="Conversion %" />
                      <Bar dataKey="virality" fill="#8B5CF6" name="Virality %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Strategy Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Marketing Strategy Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={strategyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {strategyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Emotion & Hook Effectiveness */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Emotional & Hook Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={emotionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="emotion" stroke="#F59E0B" name="Emotional Score" strokeWidth={3} />
                      <Line type="monotone" dataKey="hook" stroke="#EF4444" name="Hook Effectiveness" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sentiment Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Sentiment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sentiment" fill="#10B981" name="Sentiment Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Individual Ad Analysis */}
            <Tabs defaultValue="ad-1" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                {selectedAds.map((ad, index) => (
                  <TabsTrigger key={index} value={`ad-${index + 1}`}>
                    Ad {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {analysis.map((adAnalysis, index) => (
                <TabsContent key={index} value={`ad-${index + 1}`} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Ad Preview */}
                    <Card className="mb-6 bg-gradient-to-r from-gray-50 to-gray-100">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Ad Preview</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-white">{adAnalysis.ad.business_type}</Badge>
                            <Badge variant="outline" className="bg-white">{adAnalysis.ad.category}</Badge>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-white rounded-lg p-4 mb-4 border shadow-sm">
                          <p className="text-gray-700 mb-2">{adAnalysis.ad.ad_creative_body}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {adAnalysis.ad.impressions.toLocaleString()} impressions
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${adAnalysis.ad.spend.toLocaleString()} spent
                            </span>
                          </div>
                        </div>
                        <Button asChild variant="outline" className="w-full bg-white">
                          <a href={adAnalysis.ad.ad_snapshot_url} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4 mr-2" />
                            View Original Ad
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Analysis Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Marketing Strategy */}
                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-blue-900">
                            <Target className="w-5 h-5" />
                            Marketing Strategy
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-blue-800">Primary Strategy</h4>
                            <Badge className="bg-blue-200 text-blue-800 border-blue-300">
                              {adAnalysis.marketingStrategy.primaryStrategy}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-blue-800">Call to Action</h4>
                            <p className="text-sm bg-white p-3 rounded-lg border shadow-sm text-gray-700">
                              {adAnalysis.marketingStrategy.callToAction}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-blue-800">Value Proposition</h4>
                            <p className="text-sm bg-white p-3 rounded-lg border shadow-sm text-gray-700">
                              {adAnalysis.marketingStrategy.valueProposition}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Emotional Analysis */}
                      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-red-900">
                            <Heart className="w-5 h-5" />
                            Emotional Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-red-800">Primary Emotion</h4>
                            <Badge className="bg-red-200 text-red-800 border-red-300">
                              {adAnalysis.emotionalAnalysis.primaryEmotion}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-red-800">Emotional Score</h4>
                            <Progress value={adAnalysis.emotionalAnalysis.emotionalScore} className="mb-2" />
                            <span className="text-sm text-red-700">
                              {adAnalysis.emotionalAnalysis.emotionalScore.toFixed(1)}/100
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-red-800">Emotional Triggers</h4>
                            <div className="space-y-1">
                              {adAnalysis.emotionalAnalysis.emotionalTriggers.map((trigger, i) => (
                                <Badge key={i} variant="secondary" className="mr-1 bg-white text-red-700 border-red-300">
                                  {trigger}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Sentiment Analysis */}
                      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-900">
                            <MessageSquare className="w-5 h-5" />
                            Sentiment Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-green-800">Overall Sentiment</h4>
                            <Badge className={`${getSentimentColor(adAnalysis.sentimentAnalysis.overallSentiment)} border-green-300`}>
                              <span className="flex items-center gap-1">
                                {getSentimentIcon(adAnalysis.sentimentAnalysis.overallSentiment)}
                                {adAnalysis.sentimentAnalysis.overallSentiment}
                              </span>
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-green-800">Sentiment Score</h4>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={Math.abs(adAnalysis.sentimentAnalysis.sentimentScore)} 
                                className="flex-1"
                              />
                              <span className="text-sm font-mono text-green-700">
                                {adAnalysis.sentimentAnalysis.sentimentScore.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-green-800">Key Phrases</h4>
                            <div className="space-y-1">
                              {adAnalysis.sentimentAnalysis.keyPhrases.map((phrase, i) => (
                                <Badge key={i} variant="outline" className="mr-1 bg-white text-green-700 border-green-300">
                                  {phrase}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Hooks Analysis */}
                      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-orange-900">
                            <Zap className="w-5 h-5" />
                            Hooks Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-orange-800">Primary Hook</h4>
                            <p className="text-sm bg-white p-3 rounded-lg border shadow-sm text-gray-700 italic">
                              "{adAnalysis.hooks.primaryHook}"
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-orange-800">Hook Type</h4>
                            <Badge className="bg-orange-200 text-orange-800 border-orange-300">
                              {adAnalysis.hooks.hookType.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-orange-800">Effectiveness</h4>
                            <Progress value={adAnalysis.hooks.hookEffectiveness} className="mb-2" />
                            <span className="text-sm text-orange-700">
                              {adAnalysis.hooks.hookEffectiveness.toFixed(1)}/100
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Performance Metrics */}
                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 lg:col-span-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-purple-900">
                            <TrendingUp className="w-5 h-5" />
                            Performance Metrics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                              <div className="mb-4">
                                <Activity className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                                <h4 className="font-semibold text-purple-800">Estimated Engagement</h4>
                              </div>
                              <Progress value={adAnalysis.performanceMetrics.estimatedEngagement} className="mb-2" />
                              <span className="text-2xl font-bold text-purple-900">
                                {adAnalysis.performanceMetrics.estimatedEngagement.toFixed(1)}%
                              </span>
                            </div>
                            <div className="text-center">
                              <div className="mb-4">
                                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-2" />
                                <h4 className="font-semibold text-green-800">Conversion Potential</h4>
                              </div>
                              <Progress value={adAnalysis.performanceMetrics.conversionPotential} className="mb-2" />
                              <span className="text-2xl font-bold text-green-900">
                                {adAnalysis.performanceMetrics.conversionPotential.toFixed(1)}%
                              </span>
                            </div>
                            <div className="text-center">
                              <div className="mb-4">
                                <Zap className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                                <h4 className="font-semibold text-orange-800">Virality Score</h4>
                              </div>
                              <Progress value={adAnalysis.performanceMetrics.viralityScore} className="mb-2" />
                              <span className="text-2xl font-bold text-orange-900">
                                {adAnalysis.performanceMetrics.viralityScore.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
