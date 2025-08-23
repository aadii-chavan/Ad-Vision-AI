import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Image as ImageIcon,
  Sparkles,
  Eye,
  Download,
  Share2,
  ArrowRight,
  Palette,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GeneratedImage {
  id: number;
  brandName: string;
  industry: string;
  generatedImage: string;
  createdAt: string;
  blueprint?: any;
}

const GeneratedImagesShowcase: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGeneratedImages = () => {
      try {
        const savedCampaigns = JSON.parse(localStorage.getItem('dashboardCampaigns') || '[]');
        // Filter campaigns that have generated images
        const imagesWithData = savedCampaigns
          .filter((campaign: any) => campaign.generatedImage && campaign.generatedImage !== 'https://via.placeholder.com/1024x1024/3B82F6/FFFFFF?text=Campaign+Visual+Generated')
          .map((campaign: any) => ({
            id: campaign.id,
            brandName: campaign.brandName,
            industry: campaign.industry || 'General',
            generatedImage: campaign.generatedImage,
            createdAt: campaign.createdAt,
            blueprint: campaign.blueprint
          }))
          .sort((a: GeneratedImage, b: GeneratedImage) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 8); // Show up to 8 images
        
        setGeneratedImages(imagesWithData);
      } catch (error) {
        console.error('Failed to load generated images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGeneratedImages();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleImageClick = (image: GeneratedImage) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDownload = (imageUrl: string, brandName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${brandName}-campaign-visual.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading AI-generated images...</p>
          </div>
        </div>
      </section>
    );
  }

  if (generatedImages.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Palette className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">No AI-Generated Images Yet</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Once you create campaigns with AI image generation, your visuals will appear here. 
              Each image is uniquely crafted based on your brand and campaign strategy.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/smart-insights')}
              className="px-8 py-3"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Your First AI Image
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">AI-Generated Campaign Visuals</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Discover stunning campaign visuals created by our AI. Each image is generated based on 
              competitive analysis, brand strategy, and creative guidelines to ensure maximum impact.
            </p>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {generatedImages.map((image) => (
              <Card 
                key={image.id} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                onClick={() => handleImageClick(image)}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={image.generatedImage} 
                      alt={`${image.brandName} campaign visual`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {image.industry}
                        </Badge>
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {image.brandName}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(image.createdAt)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Zap className="w-3 h-3" />
                    <span>AI Generated</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/smart-insights')}
              className="px-8 py-3"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Your Own AI Visual
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={handleCloseModal}>
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="flex items-center justify-between p-6 pb-4">
              <div>
                <CardTitle className="text-2xl">{selectedImage.brandName}</CardTitle>
                <p className="text-muted-foreground">{selectedImage.industry} • {formatDate(selectedImage.createdAt)}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownload(selectedImage.generatedImage, selectedImage.brandName)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 pt-0">
              <div className="text-center">
                <img 
                  src={selectedImage.generatedImage} 
                  alt={`${selectedImage.brandName} campaign visual`}
                  className="w-full max-h-[60vh] object-contain rounded-lg"
                />
              </div>
              
              {selectedImage.blueprint?.creativeStrategy && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Creative Strategy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Headline:</span>
                      <p className="font-medium">{selectedImage.blueprint.creativeStrategy.headline}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Visual Style:</span>
                      <p className="font-medium">{selectedImage.blueprint.creativeStrategy.visualStyle}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneratedImagesShowcase;
