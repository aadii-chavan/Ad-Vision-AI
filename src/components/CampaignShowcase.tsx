import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Image as ImageIcon,
  Target,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  Lightbulb,
  Award,
  BarChart3,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CampaignSummary {
  id: number;
  createdAt: string;
  brandName: string;
  analysis: any[];
  insights: any;
  blueprint: any;
  generatedImage: string | null;
  status: string;
}

const CampaignShowcase: React.FC = () => {
  const [campaigns, setCampaigns] = useState<CampaignSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCampaigns = () => {
      try {
        const savedCampaigns = JSON.parse(localStorage.getItem('dashboardCampaigns') || '[]');
        // Sort by creation date, newest first, and limit to 6 for showcase
        const sortedCampaigns = savedCampaigns
          .sort((a: CampaignSummary, b: CampaignSummary) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 6);
        setCampaigns(sortedCampaigns);
      } catch (error) {
        console.error('Failed to load campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPerformanceScore = (analysis: any[]) => {
    if (!analysis || analysis.length === 0) return 0;
    const avgEngagement = analysis.reduce((sum, item) => sum + (item.performanceMetrics?.estimatedEngagement || 0), 0) / analysis.length;
    const avgConversion = analysis.reduce((sum, item) => sum + (item.performanceMetrics?.conversionPotential || 0), 0) / analysis.length;
    return Math.round((avgEngagement + avgConversion) / 2);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading campaigns...</p>
          </div>
        </div>
      </section>
    );
  }

  if (campaigns.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your First Campaign?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Start by analyzing competitor ads and generating AI-powered campaign insights. 
              Your campaigns will appear here once created.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/smart-insights')}
              className="px-8 py-3"
            >
              <Target className="w-5 h-5 mr-2" />
              Start Campaign Analysis
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Campaign Showcase</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover AI-generated campaign insights and visuals from our platform. 
            Each campaign is powered by competitive analysis and strategic recommendations.
          </p>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {campaign.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(campaign.createdAt)}
                  </span>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {campaign.brandName}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Generated Image */}
                {campaign.generatedImage && (
                  <div className="relative overflow-hidden rounded-lg bg-muted">
                    <img 
                      src={campaign.generatedImage} 
                      alt={`${campaign.brandName} campaign visual`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}

                {/* Campaign Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">
                      {campaign.analysis?.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Ads Analyzed</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">
                      {getPerformanceScore(campaign.analysis)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">
                      {campaign.blueprint ? '✓' : '—'}
                    </div>
                    <div className="text-xs text-muted-foreground">Blueprint</div>
                  </div>
                </div>

                {/* Key Insights Preview */}
                {campaign.insights?.competitiveAdvantage?.uniquePositioning && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      <strong>Key Insight:</strong> {campaign.insights.competitiveAdvantage.uniquePositioning}
                    </p>
                  </div>
                )}

                {/* View Details Button */}
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                  onClick={() => navigate('/dashboard')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/smart-insights')}
            className="px-8 py-3"
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            Create New Campaign
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CampaignShowcase;
