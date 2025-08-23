import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';
import { ChevronDown, Globe, Eye, BarChart2, DollarSign, Check, AlertCircle, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

// --- Types ---
interface Ad {
  ad_creative_body: string;
  ad_snapshot_url: string;
  spend: number;
  impressions: number;
  country?: string;
  business_type: string;
  category: string;
  platform: string;
  ad_type: string;
  target_audience: string;
}

const COUNTRY_OPTIONS = [
  { value: 'US', label: 'United States' },
  { value: 'IN', label: 'India' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
];

const BUSINESS_TYPE_OPTIONS = [
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Food & Beverage', label: 'Food & Beverage' },
  { value: 'Health & Fitness', label: 'Health & Fitness' },
  { value: 'Education', label: 'Education' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Financial Services', label: 'Financial Services' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Automotive', label: 'Automotive' },
  { value: 'Beauty', label: 'Beauty' },
  { value: 'Gaming', label: 'Gaming' },
  { value: 'Home & Garden', label: 'Home & Garden' },
];

const CATEGORY_OPTIONS = [
  { value: 'Fashion & Apparel', label: 'Fashion & Apparel' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Fast Food', label: 'Fast Food' },
  { value: 'Coffee', label: 'Coffee' },
  { value: 'Gym', label: 'Gym' },
  { value: 'Mobile App', label: 'Mobile App' },
  { value: 'Online Learning', label: 'Online Learning' },
  { value: 'Online Travel', label: 'Online Travel' },
  { value: 'Investment', label: 'Investment' },
  { value: 'Banking', label: 'Banking' },
  { value: 'Streaming', label: 'Streaming' },
  { value: 'Music Streaming', label: 'Music Streaming' },
  { value: 'Electric Vehicles', label: 'Electric Vehicles' },
  { value: 'Cosmetics', label: 'Cosmetics' },
  { value: 'Skincare', label: 'Skincare' },
  { value: 'Gaming Console', label: 'Gaming Console' },
  { value: 'Furniture', label: 'Furniture' },
];

const PAGE_SIZE = 12;

const CompetitorAds: React.FC = () => {
  // --- State ---
  const [search, setSearch] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [impressions, setImpressions] = useState<[number, number]>([0, 1000000]);
  const [spend, setSpend] = useState<[number, number]>([0, 100000]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAds, setSelectedAds] = useState<Ad[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  // --- Fetch Ads ---
  const fetchAds = async (opts?: { append?: boolean }) => {
    setLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (search) params.append('q', search);
      if (selectedCountries.length > 0) params.append('country', selectedCountries.join(','));
      if (impressions[0] > 0) params.append('impressions_min', impressions[0].toString());
      if (impressions[1] < 1000000) params.append('impressions_max', impressions[1].toString());
      if (spend[0] > 0) params.append('spend_min', spend[0].toString());
      if (spend[1] < 100000) params.append('spend_max', spend[1].toString());
      params.append('limit', PAGE_SIZE.toString());
      params.append('offset', ((page - 1) * PAGE_SIZE).toString());

      // Use Python backend endpoint
      const res = await fetch(`http://127.0.0.1:5000/api/fetch-ads?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch ads');
      const data: Ad[] = await res.json();
      setAds(prev => opts?.append ? [...prev, ...data] : data);
      setHasMore(data.length === PAGE_SIZE);
    } catch (e) {
      setAds([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch on mount & when filters change ---
  useEffect(() => {
    setPage(1);
    fetchAds({ append: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedCountries, impressions, spend]);

  // --- Fetch more for pagination ---
  const handleLoadMore = () => {
    setPage(p => p + 1);
  };
  useEffect(() => {
    if (page > 1) fetchAds({ append: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // --- Multi-select for countries ---
  const handleCountryChange = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  // --- Multi-select for business types ---
  const handleBusinessTypeChange = (businessType: string) => {
    setSelectedBusinessTypes(prev =>
      prev.includes(businessType) ? prev.filter(b => b !== businessType) : [...prev, businessType]
    );
  };

  // --- Multi-select for categories ---
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // --- Selection Functions ---
  const handleAdSelection = (ad: Ad) => {
    setSelectedAds(prev => {
      const isSelected = prev.some(selectedAd => selectedAd.ad_snapshot_url === ad.ad_snapshot_url);
      if (isSelected) {
        return prev.filter(selectedAd => selectedAd.ad_snapshot_url !== ad.ad_snapshot_url);
      } else {
        if (prev.length >= 3) {
          return prev;
        }
        return [...prev, ad];
      }
    });
  };

  const isAdSelected = (ad: Ad) => {
    return selectedAds.some(selectedAd => selectedAd.ad_snapshot_url === ad.ad_snapshot_url);
  };

  const handleAnalyzeSelected = async () => {
    if (selectedAds.length === 0) return;
    
    setAnalyzing(true);
    try {
      // Store selected ads in localStorage for the analytics page
      localStorage.setItem('selectedAdsForAnalysis', JSON.stringify(selectedAds));
      
      // Navigate to analytics page
      navigate('/analytics');
    } catch (error) {
      console.error('Error preparing analysis:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  // --- Get active filter count ---
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCountries.length > 0) count++;
    if (selectedBusinessTypes.length > 0) count++;
    if (selectedCategories.length > 0) count++;
    if (impressions[0] > 0 || impressions[1] < 1000000) count++;
    if (spend[0] > 0 || spend[1] < 100000) count++;
    return count;
  };

  // --- Clear all filters ---
  const clearAllFilters = () => {
    setSelectedCountries([]);
    setSelectedBusinessTypes([]);
    setSelectedCategories([]);
    setImpressions([0, 1000000]);
    setSpend([0, 100000]);
  };

  // --- UI ---
  return (
    <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
      {/* Backgrounds, overlays, etc. */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none"></div>
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar />
      </div>
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-[90] pt-20">
        <div className="h-full overflow-y-auto">
          <DashboardSidebar />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 ml-64 pt-20 relative z-10">
        <div className="h-full overflow-y-auto">
          <main className={`p-6 max-w-7xl mx-auto ${selectedAds.length > 0 ? 'pt-20' : ''}`}>
            {/* Fixed Selection Status Bar */}
            {selectedAds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-20 left-64 right-0 z-[95] bg-background/95 backdrop-blur-sm border-b border-primary/20 shadow-sm"
              >
                <div className="max-w-7xl mx-auto px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="font-medium text-primary">
                        {selectedAds.length} ad{selectedAds.length !== 1 ? 's' : ''} selected
                      </span>
                      {selectedAds.length >= 3 && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Max reached
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAds([])}
                      >
                        Clear Selection
                      </Button>
                      <Button
                        onClick={handleAnalyzeSelected}
                        disabled={analyzing}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {analyzing ? 'Preparing...' : `Analyze ${selectedAds.length} Ad${selectedAds.length !== 1 ? 's' : ''}`}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Competitor Ads</h1>
                  <p className="text-gray-600 mt-1">Discover and analyze competitor advertising strategies</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Filter Button */}
                  <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2 px-4 py-2 border-2 hover:border-primary/50 transition-colors"
                      >
                        <Filter className="w-4 h-4" />
                        Filters
                        {getActiveFilterCount() > 0 && (
                          <Badge variant="secondary" className="ml-1 text-xs">
                            {getActiveFilterCount()}
                          </Badge>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                          <span>Advanced Filters</span>
                          {getActiveFilterCount() > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={clearAllFilters}
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              Clear All
                            </Button>
                          )}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6 py-4">
                        {/* Country Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Country</label>
                          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                            {COUNTRY_OPTIONS.map(opt => (
                              <label key={opt.value} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                                <input
                                  type="checkbox"
                                  checked={selectedCountries.includes(opt.value)}
                                  onChange={() => handleCountryChange(opt.value)}
                                  className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Business Type Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Business Type</label>
                          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                            {BUSINESS_TYPE_OPTIONS.map(opt => (
                              <label key={opt.value} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                                <input
                                  type="checkbox"
                                  checked={selectedBusinessTypes.includes(opt.value)}
                                  onChange={() => handleBusinessTypeChange(opt.value)}
                                  className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                            {CATEGORY_OPTIONS.map(opt => (
                              <label key={opt.value} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                                <input
                                  type="checkbox"
                                  checked={selectedCategories.includes(opt.value)}
                                  onChange={() => handleCategoryChange(opt.value)}
                                  className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Range Filters */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* Impressions Range */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Impressions Range</label>
                            <div className="space-y-2">
                              <Input
                                type="number"
                                placeholder="Min"
                                value={impressions[0] || ''}
                                onChange={e => setImpressions([+e.target.value || 0, impressions[1]])}
                                className="w-full"
                              />
                              <Input
                                type="number"
                                placeholder="Max"
                                value={impressions[1] || ''}
                                onChange={e => setImpressions([impressions[0], +e.target.value || 1000000])}
                                className="w-full"
                              />
                            </div>
                          </div>

                          {/* Spend Range */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Spend Range ($)</label>
                            <div className="space-y-2">
                              <Input
                                type="number"
                                placeholder="Min"
                                value={spend[0] || ''}
                                onChange={e => setSpend([+e.target.value || 0, spend[1]])}
                                className="w-full"
                              />
                              <Input
                                type="number"
                                placeholder="Max"
                                value={spend[1] || ''}
                                onChange={e => setSpend([spend[0], +e.target.value || 100000])}
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => setFilterOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            setPage(1);
                            fetchAds({ append: false });
                            setFilterOpen(false);
                          }}
                          className="px-6"
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Input
                  placeholder="Search ads by keyword, business type, or category..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-4 pr-24 h-12 text-base border-2 focus:border-primary/50 transition-colors"
                />
                <Button 
                  onClick={() => { setPage(1); fetchAds({ append: false }); }}
                  className="absolute right-2 top-2 h-8 px-4 bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  Search
                </Button>
              </div>
            </div>
            
            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading && page === 1 ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="rounded-xl shadow-md">
                    <CardContent className="p-6">
                      <Skeleton className="h-32 w-full mb-4 rounded-lg" />
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                <AnimatePresence>
                  {ads.map((ad, i) => (
                    <motion.div
                      key={ad.ad_snapshot_url + i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <Card 
                        className={cn(
                          "rounded-xl shadow-md flex flex-col h-full cursor-pointer transition-all duration-200 hover:shadow-lg border-2 hover:border-primary/20",
                          isAdSelected(ad) && "ring-2 ring-primary bg-primary/5 border-primary"
                        )}
                        onClick={() => handleAdSelection(ad)}
                      >
                        <CardContent className="flex flex-col gap-4 p-6 flex-1">
                          {/* Selection Indicator */}
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="text-base font-medium mb-2 line-clamp-3">{ad.ad_creative_body}</div>
                              {/* Additional ad info */}
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">{ad.business_type}</Badge>
                                  <Badge variant="outline" className="text-xs">{ad.category}</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span>Platform: {ad.platform}</span>
                                  <span>•</span>
                                  <span>Type: {ad.ad_type}</span>
                                </div>
                                <div className="text-xs">
                                  Target: {ad.target_audience}
                                </div>
                              </div>
                            </div>
                            {/* Selection Checkbox */}
                            <div className={cn(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                              isAdSelected(ad) 
                                ? "bg-primary border-primary" 
                                : "border-gray-300 hover:border-primary"
                            )}>
                              {isAdSelected(ad) && (
                                <Check className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Badge variant="secondary" className="flex items-center gap-1"><BarChart2 className="w-4 h-4" /> {ad.impressions.toLocaleString()} Impressions</Badge>
                            <Badge variant="secondary" className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> ${ad.spend.toLocaleString()}</Badge>
                          </div>
                          <Button 
                            asChild 
                            variant="outline" 
                            className="w-full mt-auto hover:bg-primary/5 hover:border-primary/30 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={ad.ad_snapshot_url} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-4 h-4 mr-1" /> View Ad
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            {/* Load More */}
            {hasMore && !loading && (
              <div className="flex justify-center mt-8">
                <Button onClick={handleLoadMore} variant="secondary" className="px-8">
                  Load More
                </Button>
              </div>
            )}
            {loading && page > 1 && (
              <div className="flex justify-center mt-8">
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
            )}
            
            {/* No Results */}
            {!loading && ads.length === 0 && (
              <div className="text-center text-muted-foreground py-16 text-lg">No ads found for your search.</div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAds;
