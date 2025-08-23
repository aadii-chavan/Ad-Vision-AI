import random
from typing import List, Dict, Any
from datetime import datetime, timedelta

# Mock Ads Dataset
MOCK_ADS = [
    # E-commerce & Retail
    {
        "id": "ad_001",
        "ad_creative_body": "🔥 FLASH SALE! Get 50% OFF on Nike Air Max. Limited time only. Free shipping on orders over $50. Don't miss out on this amazing deal!",
        "ad_snapshot_url": "https://example.com/ads/nike-sale.jpg",
        "spend": 2500,
        "impressions": 45000,
        "country": "US",
        "business_type": "E-commerce",
        "category": "Fashion & Apparel",
        "platform": "Facebook",
        "ad_type": "Promotional",
        "target_audience": "Sports enthusiasts, 18-35",
        "created_date": "2024-08-15"
    },
    {
        "id": "ad_002",
        "ad_creative_body": "New iPhone 15 Pro Max - Pre-order now and get free AirPods! Experience the future of mobile photography. Available in 4 stunning colors.",
        "ad_snapshot_url": "https://example.com/ads/iphone15.jpg",
        "spend": 15000,
        "impressions": 120000,
        "country": "US",
        "business_type": "Technology",
        "category": "Electronics",
        "platform": "Instagram",
        "ad_type": "Product Launch",
        "target_audience": "Tech enthusiasts, 25-45",
        "created_date": "2024-08-20"
    },
    {
        "id": "ad_003",
        "ad_creative_body": "Transform your home with our premium furniture collection. Modern designs, affordable prices. Shop now and get 20% off your first purchase!",
        "ad_snapshot_url": "https://example.com/ads/furniture.jpg",
        "spend": 3200,
        "impressions": 28000,
        "country": "US",
        "business_type": "Home & Garden",
        "category": "Furniture",
        "platform": "Facebook",
        "ad_type": "Brand Awareness",
        "target_audience": "Homeowners, 30-50",
        "created_date": "2024-08-18"
    },
    
    # Food & Beverage
    {
        "id": "ad_004",
        "ad_creative_body": "🍕 Domino's Pizza - Order online and get 2 large pizzas for the price of 1! Hot, fresh, and delivered to your door in 30 minutes or less.",
        "ad_snapshot_url": "https://example.com/ads/dominos.jpg",
        "spend": 8500,
        "impressions": 95000,
        "country": "US",
        "business_type": "Food & Beverage",
        "category": "Fast Food",
        "platform": "Facebook",
        "ad_type": "Promotional",
        "target_audience": "Young adults, 18-30",
        "created_date": "2024-08-22"
    },
    {
        "id": "ad_005",
        "ad_creative_body": "Starbucks Rewards - Join our loyalty program and earn points on every purchase. Free birthday drink and exclusive member offers!",
        "ad_snapshot_url": "https://example.com/ads/starbucks.jpg",
        "spend": 12000,
        "impressions": 150000,
        "country": "US",
        "business_type": "Food & Beverage",
        "category": "Coffee",
        "platform": "Instagram",
        "ad_type": "Loyalty Program",
        "target_audience": "Coffee lovers, 20-40",
        "created_date": "2024-08-19"
    },
    
    # Health & Fitness
    {
        "id": "ad_006",
        "ad_creative_body": "💪 Start your fitness journey today! Join Planet Fitness for just $10/month. No judgment zone, 24/7 access, and free fitness training.",
        "ad_snapshot_url": "https://example.com/ads/planet-fitness.jpg",
        "spend": 6800,
        "impressions": 75000,
        "country": "US",
        "business_type": "Health & Fitness",
        "category": "Gym",
        "platform": "Facebook",
        "ad_type": "Membership",
        "target_audience": "Fitness beginners, 18-35",
        "created_date": "2024-08-21"
    },
    {
        "id": "ad_007",
        "ad_creative_body": "MyFitnessPal - Track your calories, macros, and workouts. Join 200+ million users worldwide. Download now and get 30 days premium free!",
        "ad_snapshot_url": "https://example.com/ads/myfitnesspal.jpg",
        "spend": 4200,
        "impressions": 55000,
        "country": "US",
        "business_type": "Health & Fitness",
        "category": "Mobile App",
        "platform": "Instagram",
        "ad_type": "App Download",
        "target_audience": "Health conscious, 25-45",
        "created_date": "2024-08-17"
    },
    
    # Education & Learning
    {
        "id": "ad_008",
        "ad_creative_body": "🎓 Learn to code with Codecademy! Master Python, JavaScript, and more. Start your tech career today. 50% off annual membership.",
        "ad_snapshot_url": "https://example.com/ads/codecademy.jpg",
        "spend": 5500,
        "impressions": 65000,
        "country": "US",
        "business_type": "Education",
        "category": "Online Learning",
        "platform": "Facebook",
        "ad_type": "Course Promotion",
        "target_audience": "Career changers, 25-40",
        "created_date": "2024-08-16"
    },
    {
        "id": "ad_009",
        "ad_creative_body": "Coursera - Get certified in Data Science, Business, and more. Learn from top universities. Flexible learning at your own pace.",
        "ad_snapshot_url": "https://example.com/ads/coursera.jpg",
        "spend": 7800,
        "impressions": 88000,
        "country": "US",
        "business_type": "Education",
        "category": "Online Learning",
        "platform": "LinkedIn",
        "ad_type": "Brand Awareness",
        "target_audience": "Professionals, 28-45",
        "created_date": "2024-08-20"
    },
    
    # Travel & Tourism
    {
        "id": "ad_010",
        "ad_creative_body": "✈️ Book your dream vacation with Expedia! Save up to 40% on flights and hotels. Discover amazing destinations worldwide.",
        "ad_snapshot_url": "https://example.com/ads/expedia.jpg",
        "spend": 18000,
        "impressions": 200000,
        "country": "US",
        "business_type": "Travel",
        "category": "Online Travel",
        "platform": "Facebook",
        "ad_type": "Travel Booking",
        "target_audience": "Travelers, 25-55",
        "created_date": "2024-08-22"
    },
    {
        "id": "ad_011",
        "ad_creative_body": "Airbnb - Experience unique stays around the world. From cozy apartments to luxury villas. Book your next adventure today!",
        "ad_snapshot_url": "https://example.com/ads/airbnb.jpg",
        "spend": 22000,
        "impressions": 250000,
        "country": "US",
        "business_type": "Travel",
        "category": "Accommodation",
        "platform": "Instagram",
        "ad_type": "Brand Awareness",
        "target_audience": "Adventure seekers, 25-45",
        "created_date": "2024-08-19"
    },
    
    # Financial Services
    {
        "id": "ad_012",
        "ad_creative_body": "Robinhood - Start investing with just $1. Commission-free trading on stocks, ETFs, and crypto. Join millions of investors.",
        "ad_snapshot_url": "https://example.com/ads/robinhood.jpg",
        "spend": 25000,
        "impressions": 300000,
        "country": "US",
        "business_type": "Financial Services",
        "category": "Investment",
        "platform": "Facebook",
        "ad_type": "App Download",
        "target_audience": "Young investors, 18-35",
        "created_date": "2024-08-21"
    },
    {
        "id": "ad_013",
        "ad_creative_body": "Chase Bank - Get $200 when you open a new checking account. No monthly fees with direct deposit. Apply online in minutes.",
        "ad_snapshot_url": "https://example.com/ads/chase.jpg",
        "spend": 15000,
        "impressions": 180000,
        "country": "US",
        "business_type": "Financial Services",
        "category": "Banking",
        "platform": "Facebook",
        "ad_type": "Account Opening",
        "target_audience": "New customers, 18-50",
        "created_date": "2024-08-18"
    },
    
    # Entertainment & Media
    {
        "id": "ad_014",
        "ad_creative_body": "Netflix - Watch unlimited movies and TV shows. New releases every week. Start your free trial today!",
        "ad_snapshot_url": "https://example.com/ads/netflix.jpg",
        "spend": 30000,
        "impressions": 400000,
        "country": "US",
        "business_type": "Entertainment",
        "category": "Streaming",
        "platform": "Instagram",
        "ad_type": "Subscription",
        "target_audience": "Entertainment lovers, 18-50",
        "created_date": "2024-08-20"
    },
    {
        "id": "ad_015",
        "ad_creative_body": "Spotify Premium - Listen to music without ads. Download songs for offline listening. Try free for 30 days!",
        "ad_snapshot_url": "https://example.com/ads/spotify.jpg",
        "spend": 20000,
        "impressions": 250000,
        "country": "US",
        "business_type": "Entertainment",
        "category": "Music Streaming",
        "platform": "Facebook",
        "ad_type": "Subscription",
        "target_audience": "Music lovers, 16-40",
        "created_date": "2024-08-17"
    },
    
    # Automotive
    {
        "id": "ad_016",
        "ad_creative_body": "Tesla Model 3 - Experience the future of driving. Zero emissions, autopilot, and 350-mile range. Order yours today!",
        "ad_snapshot_url": "https://example.com/ads/tesla.jpg",
        "spend": 35000,
        "impressions": 500000,
        "country": "US",
        "business_type": "Automotive",
        "category": "Electric Vehicles",
        "platform": "Facebook",
        "ad_type": "Product Launch",
        "target_audience": "Tech enthusiasts, 30-50",
        "created_date": "2024-08-22"
    },
    {
        "id": "ad_017",
        "ad_creative_body": "CarMax - Find your perfect car with our no-haggle pricing. 30-day money-back guarantee. Shop online or visit a store.",
        "ad_snapshot_url": "https://example.com/ads/carmax.jpg",
        "spend": 12000,
        "impressions": 150000,
        "country": "US",
        "business_type": "Automotive",
        "category": "Car Dealership",
        "platform": "Instagram",
        "ad_type": "Brand Awareness",
        "target_audience": "Car buyers, 25-55",
        "created_date": "2024-08-19"
    },
    
    # Beauty & Personal Care
    {
        "id": "ad_018",
        "ad_creative_body": "Sephora - Discover your perfect beauty routine. Shop thousands of brands. Get 15% off your first purchase!",
        "ad_snapshot_url": "https://example.com/ads/sephora.jpg",
        "spend": 18000,
        "impressions": 220000,
        "country": "US",
        "business_type": "Beauty",
        "category": "Cosmetics",
        "platform": "Instagram",
        "ad_type": "Promotional",
        "target_audience": "Beauty enthusiasts, 18-35",
        "created_date": "2024-08-21"
    },
    {
        "id": "ad_019",
        "ad_creative_body": "Glossier - Skincare that works. Clean, effective products for real people. Join the Glossier community today!",
        "ad_snapshot_url": "https://example.com/ads/glossier.jpg",
        "spend": 14000,
        "impressions": 180000,
        "country": "US",
        "business_type": "Beauty",
        "category": "Skincare",
        "platform": "Instagram",
        "ad_type": "Brand Awareness",
        "target_audience": "Skincare enthusiasts, 20-35",
        "created_date": "2024-08-18"
    },
    
    # Gaming
    {
        "id": "ad_020",
        "ad_creative_body": "🎮 PlayStation 5 - Experience next-gen gaming. Pre-order now and get exclusive launch titles. Limited stock available!",
        "ad_snapshot_url": "https://example.com/ads/ps5.jpg",
        "spend": 40000,
        "impressions": 600000,
        "country": "US",
        "business_type": "Gaming",
        "category": "Gaming Console",
        "platform": "Facebook",
        "ad_type": "Product Launch",
        "target_audience": "Gamers, 16-35",
        "created_date": "2024-08-20"
    }
]

def filter_ads(
    search_query: str = "",
    countries: List[str] = None,
    business_types: List[str] = None,
    categories: List[str] = None,
    min_spend: int = 0,
    max_spend: int = 100000,
    min_impressions: int = 0,
    max_impressions: int = 1000000,
    limit: int = 12,
    offset: int = 0
) -> List[Dict[str, Any]]:
    """
    Filter and search through mock ads data
    """
    filtered_ads = MOCK_ADS.copy()
    
    # Search by query (case-insensitive)
    if search_query:
        search_query = search_query.lower()
        filtered_ads = [
            ad for ad in filtered_ads
            if (search_query in ad["ad_creative_body"].lower() or
                search_query in ad["business_type"].lower() or
                search_query in ad["category"].lower() or
                search_query in ad["target_audience"].lower())
        ]
    
    # Filter by countries
    if countries:
        filtered_ads = [ad for ad in filtered_ads if ad["country"] in countries]
    
    # Filter by business types
    if business_types:
        filtered_ads = [ad for ad in filtered_ads if ad["business_type"] in business_types]
    
    # Filter by categories
    if categories:
        filtered_ads = [ad for ad in filtered_ads if ad["category"] in categories]
    
    # Filter by spend range
    filtered_ads = [
        ad for ad in filtered_ads
        if min_spend <= ad["spend"] <= max_spend
    ]
    
    # Filter by impressions range
    filtered_ads = [
        ad for ad in filtered_ads
        if min_impressions <= ad["impressions"] <= max_impressions
    ]
    
    # Apply pagination
    start_index = offset
    end_index = start_index + limit
    paginated_ads = filtered_ads[start_index:end_index]
    
    return paginated_ads

def get_unique_values(field: str) -> List[str]:
    """
    Get unique values for a specific field (for filters)
    """
    return list(set(ad[field] for ad in MOCK_ADS))

def get_business_types() -> List[str]:
    """Get all unique business types"""
    return get_unique_values("business_type")

def get_categories() -> List[str]:
    """Get all unique categories"""
    return get_unique_values("category")

def get_countries() -> List[str]:
    """Get all unique countries"""
    return get_unique_values("country")

def get_ad_types() -> List[str]:
    """Get all unique ad types"""
    return get_unique_values("ad_type")

def get_platforms() -> List[str]:
    """Get all unique platforms"""
    return get_unique_values("platform")

# Sample usage and testing
if __name__ == "__main__":
    # Test filtering
    print("All business types:", get_business_types())
    print("All categories:", get_categories())
    print("All countries:", get_countries())
    
    # Test search
    results = filter_ads(search_query="fitness", limit=5)
    print(f"\nFound {len(results)} ads for 'fitness'")
    for ad in results:
        print(f"- {ad['ad_creative_body'][:50]}...")
