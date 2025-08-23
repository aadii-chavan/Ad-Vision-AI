import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';

interface CampaignData {
  name: string;
  description: string;
  targetAudience: string;
  budget: number;
  duration: string;
  platform: string;
  objective: string;
  creativeElements: {
    headline: string;
    subheadline: string;
    callToAction: string;
    visualStyle: string;
    toneOfVoice: string;
  };
  marketingStrategy: {
    primaryStrategy: string;
    keyMessages: string[];
    emotionalAppeal: string;
    hookStrategy: string;
  };
  performanceMetrics: {
    expectedReach: number;
    estimatedEngagement: number;
    conversionRate: number;
    roi: number;
  };
  generatedImage?: string;
  status: 'draft' | 'ready' | 'active' | 'paused' | 'completed';
}

const CampaignCreation: React.FC = () => {
  const [campaign, setCampaign] = useState<CampaignData>({
    name: '',
    description: '',
    targetAudience: '',
    budget: 0,
    duration: '',
    platform: '',
    objective: '',
    creativeElements: {
      headline: '',
      subheadline: '',
      callToAction: '',
      visualStyle: '',
      toneOfVoice: ''
    },
    marketingStrategy: {
      primaryStrategy: '',
      keyMessages: [],
      emotionalAppeal: '',
      hookStrategy: ''
    },
    performanceMetrics: {
      expectedReach: 0,
      estimatedEngagement: 0,
      conversionRate: 0,
      roi: 0
    },
    status: 'draft'
  });
  
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load insights data from localStorage
    const loadInsights = () => {
      try {
        const stored = localStorage.getItem('adAnalysisForInsights');
        if (stored) {
          const analysisData = JSON.parse(stored);
          // Also try to get generated insights
          const storedInsights = localStorage.getItem('generatedInsights');
          if (storedInsights) {
            setInsights(JSON.parse(storedInsights));
            populateCampaignFromInsights(JSON.parse(storedInsights));
          }
        } else {
          setError('No insights data found. Please generate insights first.');
        }
      } catch (error) {
        setError('Failed to load insights data');
      }
    };

    loadInsights();
  }, []);

  const populateCampaignFromInsights = (insightsData: any) => {
    if (insightsData) {
      setCampaign(prev => ({
        ...prev,
        marketingStrategy: {
          primaryStrategy: insightsData.competitiveAdvantage?.differentiationStrategy || '',
          keyMessages: insightsData.creativeGuidelines?.messaging || [],
          emotionalAppeal: insightsData.strategicRecommendations?.emotionalAppeal?.[0] || '',
          hookStrategy: insightsData.strategicRecommendations?.hookOptimization?.[0] || ''
        },
        creativeElements: {
          ...prev.creativeElements,
          toneOfVoice: insightsData.creativeGuidelines?.toneOfVoice?.[0] || '',
          callToAction: insightsData.creativeGuidelines?.callToAction?.[0] || ''
        }
      }));
    }
  };

  const generateMarketingStrategy = async () => {
    setGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate-campaign-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          insights: insights,
          campaignData: campaign 
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const strategyData = await response.json();
      
      setCampaign(prev => ({
        ...prev,
        marketingStrategy: {
          ...prev.marketingStrategy,
          ...strategyData.marketingStrategy
        },
        creativeElements: {
          ...prev.creativeElements,
          ...strategyData.creativeElements
        }
      }));
      
    } catch (error) {
      console.error('Strategy generation error:', error);
      setError('Failed to generate marketing strategy. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const generateCampaignImage = async () => {
    setGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate-campaign-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          campaign: campaign,
          insights: insights
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const imageData = await response.json();
      
      setCampaign(prev => ({
        ...prev,
        generatedImage: imageData.imageUrl
      }));
      
    } catch (error) {
      console.error('Image generation error:', error);
      setError('Failed to generate campaign image. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const saveCampaign = () => {
    try {
      const campaigns = JSON.parse(localStorage.getItem('savedCampaigns') || '[]');
      campaigns.push({ ...campaign, id: Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('savedCampaigns', JSON.stringify(campaigns));
      // You could also save to backend here
    } catch (error) {
      console.error('Failed to save campaign:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCampaign(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CampaignData],
          [child]: value
        }
      }));
    } else {
      setCampaign(prev => ({
        ...prev,
        [field]: value
      }));
    }
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
                  <p className="text-muted-foreground">Create winning campaigns based on AI insights</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={saveCampaign}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button onClick={generateMarketingStrategy} disabled={generating}>
                  {generating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Lightbulb className="w-4 h-4 mr-2" />
                  )}
                  Generate Strategy
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Campaign Details */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="basic" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="creative">Creative</TabsTrigger>
                    <TabsTrigger value="strategy">Strategy</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                  </TabsList>

                  {/* Basic Info Tab */}
                  <TabsContent value="basic" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          Campaign Basics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Campaign Name</Label>
                            <Input
                              id="name"
                              value={campaign.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="Enter campaign name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="platform">Platform</Label>
                            <Select value={campaign.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="facebook">Facebook</SelectItem>
                                <SelectItem value="instagram">Instagram</SelectItem>
                                <SelectItem value="google">Google Ads</SelectItem>
                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                                <SelectItem value="tiktok">TikTok</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="objective">Objective</Label>
                            <Select value={campaign.objective} onValueChange={(value) => handleInputChange('objective', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select objective" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="awareness">Brand Awareness</SelectItem>
                                <SelectItem value="traffic">Traffic</SelectItem>
                                <SelectItem value="engagement">Engagement</SelectItem>
                                <SelectItem value="leads">Lead Generation</SelectItem>
                                <SelectItem value="sales">Sales</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="budget">Budget ($)</Label>
                            <Input
                              id="budget"
                              type="number"
                              value={campaign.budget}
                              onChange={(e) => handleInputChange('budget', parseFloat(e.target.value) || 0)}
                              placeholder="Enter budget"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={campaign.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Describe your campaign"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="targetAudience">Target Audience</Label>
                          <Textarea
                            id="targetAudience"
                            value={campaign.targetAudience}
                            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                            placeholder="Describe your target audience"
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Creative Tab */}
                  <TabsContent value="creative" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="w-5 h-5" />
                          Creative Elements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="headline">Headline</Label>
                            <Input
                              id="headline"
                              value={campaign.creativeElements.headline}
                              onChange={(e) => handleInputChange('creativeElements.headline', e.target.value)}
                              placeholder="Enter compelling headline"
                            />
                          </div>
                          <div>
                            <Label htmlFor="subheadline">Subheadline</Label>
                            <Input
                              id="subheadline"
                              value={campaign.creativeElements.subheadline}
                              onChange={(e) => handleInputChange('creativeElements.subheadline', e.target.value)}
                              placeholder="Enter subheadline"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="callToAction">Call to Action</Label>
                          <Input
                            id="callToAction"
                            value={campaign.creativeElements.callToAction}
                            onChange={(e) => handleInputChange('creativeElements.callToAction', e.target.value)}
                            placeholder="Enter call to action"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="visualStyle">Visual Style</Label>
                            <Input
                              id="visualStyle"
                              value={campaign.creativeElements.visualStyle}
                              onChange={(e) => handleInputChange('creativeElements.visualStyle', e.target.value)}
                              placeholder="Describe visual style"
                            />
                          </div>
                          <div>
                            <Label htmlFor="toneOfVoice">Tone of Voice</Label>
                            <Input
                              id="toneOfVoice"
                              value={campaign.creativeElements.toneOfVoice}
                              onChange={(e) => handleInputChange('creativeElements.toneOfVoice', e.target.value)}
                              placeholder="Describe tone of voice"
                            />
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Button onClick={generateCampaignImage} disabled={generating} className="w-full">
                            {generating ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <ImageIcon className="w-4 h-4 mr-2" />
                            )}
                            Generate Campaign Image
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Strategy Tab */}
                  <TabsContent value="strategy" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Marketing Strategy
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="primaryStrategy">Primary Strategy</Label>
                          <Textarea
                            id="primaryStrategy"
                            value={campaign.marketingStrategy.primaryStrategy}
                            onChange={(e) => handleInputChange('marketingStrategy.primaryStrategy', e.target.value)}
                            placeholder="Describe your primary marketing strategy"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="emotionalAppeal">Emotional Appeal</Label>
                          <Input
                            id="emotionalAppeal"
                            value={campaign.marketingStrategy.emotionalAppeal}
                            onChange={(e) => handleInputChange('marketingStrategy.emotionalAppeal', e.target.value)}
                            placeholder="Describe emotional appeal strategy"
                          />
                        </div>
                        <div>
                          <Label htmlFor="hookStrategy">Hook Strategy</Label>
                          <Input
                            id="hookStrategy"
                            value={campaign.marketingStrategy.hookStrategy}
                            onChange={(e) => handleInputChange('marketingStrategy.hookStrategy', e.target.value)}
                            placeholder="Describe hook strategy"
                          />
                        </div>
                        <div>
                          <Label>Key Messages</Label>
                          <div className="space-y-2">
                            {campaign.marketingStrategy.keyMessages.map((message, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={message}
                                  onChange={(e) => {
                                    const newMessages = [...campaign.marketingStrategy.keyMessages];
                                    newMessages[index] = e.target.value;
                                    handleInputChange('marketingStrategy.keyMessages', newMessages);
                                  }}
                                  placeholder={`Key message ${index + 1}`}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newMessages = campaign.marketingStrategy.keyMessages.filter((_, i) => i !== index);
                                    handleInputChange('marketingStrategy.keyMessages', newMessages);
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              onClick={() => {
                                const newMessages = [...campaign.marketingStrategy.keyMessages, ''];
                                handleInputChange('marketingStrategy.keyMessages', newMessages);
                              }}
                            >
                              Add Message
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Performance Tab */}
                  <TabsContent value="performance" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5" />
                          Performance Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expectedReach">Expected Reach</Label>
                            <Input
                              id="expectedReach"
                              type="number"
                              value={campaign.performanceMetrics.expectedReach}
                              onChange={(e) => handleInputChange('performanceMetrics.expectedReach', parseInt(e.target.value) || 0)}
                              placeholder="Expected reach"
                            />
                          </div>
                          <div>
                            <Label htmlFor="estimatedEngagement">Estimated Engagement (%)</Label>
                            <Input
                              id="estimatedEngagement"
                              type="number"
                              value={campaign.performanceMetrics.estimatedEngagement}
                              onChange={(e) => handleInputChange('performanceMetrics.estimatedEngagement', parseFloat(e.target.value) || 0)}
                              placeholder="Estimated engagement rate"
                            />
                          </div>
                          <div>
                            <Label htmlFor="conversionRate">Expected Conversion Rate (%)</Label>
                            <Input
                              id="conversionRate"
                              type="number"
                              value={campaign.performanceMetrics.conversionRate}
                              onChange={(e) => handleInputChange('performanceMetrics.conversionRate', parseFloat(e.target.value) || 0)}
                              placeholder="Expected conversion rate"
                            />
                          </div>
                          <div>
                            <Label htmlFor="roi">Expected ROI (%)</Label>
                            <Input
                              id="roi"
                              type="number"
                              value={campaign.performanceMetrics.roi}
                              onChange={(e) => handleInputChange('performanceMetrics.roi', parseFloat(e.target.value) || 0)}
                              placeholder="Expected ROI"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Column - Preview & Actions */}
              <div className="space-y-6">
                {/* Campaign Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Campaign Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <Badge variant={campaign.status === 'draft' ? 'secondary' : 'default'}>
                        {campaign.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    {campaign.generatedImage && (
                      <div className="space-y-2">
                        <Label>Generated Image</Label>
                        <img 
                          src={campaign.generatedImage} 
                          alt="Campaign visual" 
                          className="w-full rounded-lg border"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Campaign Summary</Label>
                      <div className="text-sm space-y-1">
                        <p><strong>Name:</strong> {campaign.name || 'Not set'}</p>
                        <p><strong>Platform:</strong> {campaign.platform || 'Not set'}</p>
                        <p><strong>Budget:</strong> ${campaign.budget || 0}</p>
                        <p><strong>Objective:</strong> {campaign.objective || 'Not set'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Preview Campaign
                    </Button>
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Audience Insights
                    </Button>
                  </CardContent>
                </Card>

                {/* AI Insights Summary */}
                {insights && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        AI Insights Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm">
                        <p><strong>Competitive Advantage:</strong></p>
                        <p className="text-muted-foreground">{insights.competitiveAdvantage?.uniquePositioning || 'Not available'}</p>
                      </div>
                      <div className="text-sm">
                        <p><strong>Key Strategy:</strong></p>
                        <p className="text-muted-foreground">{insights.strategicRecommendations?.marketingStrategy?.[0] || 'Not available'}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CampaignCreation;
